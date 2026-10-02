export interface Config {
  port: number;
  apiKey: string | undefined;
  maxNameLength: number;
  logRequests: boolean;
}

export function loadConfig(env: NodeJS.ProcessEnv = process.env): Config {
  return {
    port: Number(env.PORT ?? 4000),
    apiKey: env.TALLY_API_KEY || undefined,
    maxNameLength: Number(env.TALLY_MAX_NAME_LENGTH ?? 64),
    logRequests: env.TALLY_LOG_REQUESTS === "true",
  };
}
