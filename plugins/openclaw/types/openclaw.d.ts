declare module "openclaw/plugin-sdk" {
  export interface OpenClawPluginApi {
    registerCli(
      fn: (ctx: { program: any }) => void,
      opts?: { commands?: string[] },
    ): void;
    // Add other methods as needed
  }
  export function emptyPluginConfigSchema(): any;
}
