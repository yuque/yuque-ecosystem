#!/usr/bin/env node
/**
 * Sync canonical skills to the Claude Code plugin packaging copy.
 *
 * Canonical source:  skills/
 * Synced copy:       plugins/yuque-personal/skills/  (marketplace install
 *                    fetches the plugin directory, so the copy must be
 *                    committed — never edit it directly)
 *
 * Usage:
 *   node scripts/sync-skills.mjs          # overwrite copies from the source
 *   node scripts/sync-skills.mjs --check  # exit 1 if any copy drifted (for CI)
 */
import { cpSync, existsSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(import.meta.url), "../..");
const SOURCE = join(root, "skills");
const TARGETS = [join(root, "plugins/yuque-personal/skills")];

const checkMode = process.argv.includes("--check");

function listFiles(dir, base = dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true, recursive: true })
    .filter((e) => e.isFile())
    .map((e) => relative(base, join(e.parentPath, e.name)))
    .sort();
}

function diffTarget(target) {
  const sourceFiles = listFiles(SOURCE);
  const targetFiles = listFiles(target);
  const drift = [];
  for (const f of sourceFiles) {
    if (!targetFiles.includes(f)) {
      drift.push(`missing: ${f}`);
    } else if (
      !readFileSync(join(SOURCE, f)).equals(readFileSync(join(target, f)))
    ) {
      drift.push(`differs: ${f}`);
    }
  }
  for (const f of targetFiles) {
    if (!sourceFiles.includes(f)) drift.push(`extra:   ${f}`);
  }
  return drift;
}

let dirty = false;
for (const target of TARGETS) {
  const label = relative(root, target);
  const drift = diffTarget(target);
  if (drift.length === 0) {
    console.log(`✅ ${label} — in sync`);
    continue;
  }
  if (checkMode) {
    dirty = true;
    console.error(`❌ ${label} — drifted from ${relative(root, SOURCE)}:`);
    for (const line of drift) console.error(`   ${line}`);
  } else {
    rmSync(target, { recursive: true, force: true });
    cpSync(SOURCE, target, { recursive: true });
    console.log(`🔄 ${label} — resynced (${drift.length} change(s))`);
  }
}

if (checkMode && dirty) {
  console.error(
    "\nSkills copies are out of sync. Edit skills/ (the single source) and run: npm run sync-skills"
  );
  process.exit(1);
}
