/**
 * Yuque OpenClaw Plugin — Entry Point
 *
 * Registers Agent Skills and optional CLI commands for
 * interacting with Yuque via the MCP Server.
 */

import type { PluginAPI } from "@openclaw/plugin-api";

export default function register(api: PluginAPI) {
  // Skills are auto-loaded from skills/ directory via openclaw.plugin.json

  // Optional: register CLI sub-commands
  api.registerCli(({ program }) => {
    program
      .command("yuque")
      .description("Yuque MCP Server management")
      .command("status")
      .description("Check yuque-mcp server status")
      .action(async () => {
        console.log("🟢 yuque-mcp status: not yet implemented");
      });
  }, { commands: ["yuque"] });
}
