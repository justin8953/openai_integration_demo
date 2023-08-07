export function getProcessEnv(key: string, defaultValue = ''): string {
  return process.env[key] || defaultValue;
}

export function getSecret() {
  return getProcessEnv('SECRET', 'Do not use default secret in production');
}
