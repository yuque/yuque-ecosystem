import type { OpenClawPluginApi } from "openclaw/plugin-sdk";
import { emptyPluginConfigSchema } from "openclaw/plugin-sdk";

const plugin = {
  id: "yuque",
  name: "语雀 AI 生态",
  description: "语雀知识管理 — Agent Skills for OpenClaw",
  configSchema: emptyPluginConfigSchema(),
  register(api: OpenClawPluginApi) {
    api.registerCli(({ program }) => {
      program
        .command("yuque")
        .description("Yuque knowledge management")
        .command("status")
        .description("Check yuque plugin status")
        .action(async () => {
          console.log("🟢 Yuque OpenClaw Plugin");
          console.log("   Skills: see plugins/openclaw/skills/");
          console.log("   MCP Server: yuque-mcp (configure via mcpServers)");
        });
    }, { commands: ["yuque"] });
  },
};

export default plugin;
