// Validate skill frontmatter and yuque-mcp tool references. When yuque-mcp adds,
// renames, or removes a tool, update scripts/known-tools.json to match its API.

import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const skillsDir = path.join(rootDir, 'skills');
const knownToolsFile = path.join(rootDir, 'scripts', 'known-tools.json');

function displayPath(filePath) {
  return path.relative(rootDir, filePath).split(path.sep).join('/');
}

function displayValue(value) {
  return value === undefined ? '<missing>' : JSON.stringify(value);
}

function parseScalar(value) {
  const trimmed = value.trim();

  if (trimmed.length >= 2 && trimmed.startsWith('"') && trimmed.endsWith('"')) {
    try {
      return JSON.parse(trimmed);
    } catch {
      return trimmed.slice(1, -1);
    }
  }

  if (trimmed.length >= 2 && trimmed.startsWith("'") && trimmed.endsWith("'")) {
    return trimmed.slice(1, -1).replaceAll("''", "'");
  }

  return trimmed;
}

function splitFrontmatter(source) {
  if (!source.startsWith('---\n')) {
    return { error: 'opening delimiter is not "---\\n"' };
  }

  let closingIndex = source.indexOf('---\n', 4);
  while (closingIndex !== -1 && source[closingIndex - 1] !== '\n') {
    closingIndex = source.indexOf('---\n', closingIndex + 4);
  }

  if (closingIndex === -1) {
    return { error: 'closing delimiter "---\\n" is missing' };
  }

  return {
    frontmatter: source.slice(4, closingIndex),
    body: source.slice(closingIndex + 4),
    bodyOffset: closingIndex + 4,
  };
}

function parseFrontmatter(frontmatter) {
  const fields = {};
  let inMetadata = false;

  for (const line of frontmatter.split('\n')) {
    const topLevelMatch = line.match(
      /^(name|description|license|compatibility):[ \t]*(.*)$/,
    );
    if (topLevelMatch) {
      fields[topLevelMatch[1]] = parseScalar(topLevelMatch[2]);
      inMetadata = false;
      continue;
    }

    if (/^metadata:[ \t]*$/.test(line)) {
      inMetadata = true;
      continue;
    }

    if (inMetadata) {
      const authorMatch = line.match(/^[ \t]+author:[ \t]*(.*)$/);
      if (authorMatch) {
        fields.metadataAuthor = parseScalar(authorMatch[1]);
        continue;
      }

      if (line !== '' && !/^[ \t]/.test(line)) {
        inMetadata = false;
      }
    }
  }

  return fields;
}

function lineNumberAt(source, offset) {
  return source.slice(0, offset).split('\n').length;
}

let knownTools;
try {
  const parsed = JSON.parse(await readFile(knownToolsFile, 'utf8'));
  if (!Array.isArray(parsed) || parsed.some((tool) => typeof tool !== 'string')) {
    throw new TypeError('expected a JSON array containing only strings');
  }
  knownTools = new Set(parsed);
} catch (error) {
  console.error(
    `❌ ${displayPath(knownToolsFile)} — known-tools.format: ${error.message}`,
  );
  process.exit(1);
}

let skillDirectories;
try {
  skillDirectories = (await readdir(skillsDir, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
} catch (error) {
  console.error(`❌ ${displayPath(skillsDir)} — skills-dir.exists: ${error.message}`);
  process.exit(1);
}

const failures = [];
const successes = [];

for (const directoryName of skillDirectories) {
  const skillFile = path.join(skillsDir, directoryName, 'SKILL.md');
  const relativeSkillFile = displayPath(skillFile);
  let source;

  try {
    source = await readFile(skillFile, 'utf8');
  } catch (error) {
    const actual = error?.code === 'ENOENT' ? '<missing>' : error.message;
    failures.push(
      `❌ ${relativeSkillFile} — skill-file.exists: expected SKILL.md; received ${actual}`,
    );
    continue;
  }

  const split = splitFrontmatter(source);
  if (split.error) {
    failures.push(
      `❌ ${relativeSkillFile} — frontmatter.present: expected opening and closing delimiters; received ${JSON.stringify(split.error)}`,
    );
    continue;
  }

  const fields = parseFrontmatter(split.frontmatter);
  const skillFailures = [];

  if (fields.name !== directoryName) {
    skillFailures.push(
      `❌ ${relativeSkillFile} — frontmatter.name: expected ${JSON.stringify(directoryName)}; received ${displayValue(fields.name)}`,
    );
  }

  const descriptionLength =
    typeof fields.description === 'string' ? [...fields.description].length : 0;
  if (
    typeof fields.description !== 'string' ||
    descriptionLength < 50 ||
    descriptionLength > 500
  ) {
    skillFailures.push(
      `❌ ${relativeSkillFile} — frontmatter.description: expected 50–500 characters; received length=${descriptionLength}, value=${displayValue(fields.description)}`,
    );
  }

  if (fields.license !== 'MIT') {
    skillFailures.push(
      `❌ ${relativeSkillFile} — frontmatter.license: expected "MIT"; received ${displayValue(fields.license)}`,
    );
  }

  if (fields.metadataAuthor !== 'yuque') {
    skillFailures.push(
      `❌ ${relativeSkillFile} — frontmatter.metadata.author: expected "yuque"; received ${displayValue(fields.metadataAuthor)}`,
    );
  }

  const referencedTools = new Set();
  const unknownToolLines = new Map();
  for (const match of split.body.matchAll(/\byuque_[a-z_]+\b/g)) {
    const tool = match[0];
    referencedTools.add(tool);
    if (!knownTools.has(tool)) {
      const lines = unknownToolLines.get(tool) ?? [];
      lines.push(lineNumberAt(source, split.bodyOffset + match.index));
      unknownToolLines.set(tool, lines);
    }
  }

  for (const [tool, lines] of unknownToolLines) {
    skillFailures.push(
      `❌ ${relativeSkillFile} — tool-reference.known: expected a name from scripts/known-tools.json; received ${JSON.stringify(tool)} at line(s) ${lines.join(', ')}`,
    );
  }

  if (skillFailures.length > 0) {
    failures.push(...skillFailures);
  } else {
    successes.push(
      `✅ ${relativeSkillFile} — frontmatter valid; description ${descriptionLength} chars; ${referencedTools.size} known tool reference(s)`,
    );
  }
}

for (const success of successes) {
  console.log(success);
}

if (failures.length > 0) {
  for (const failure of failures) {
    console.error(failure);
  }
  process.exit(1);
}
