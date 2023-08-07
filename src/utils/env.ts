export function getProcessEnv(key: string, defaultValue = ''): string {
  return process.env[key] || defaultValue;
}
