export function getProcessEnv(key: string, defaultValue = ''): string {
  return process.env[key] || defaultValue;
}

export function isDevelopment() {
  return getProcessEnv('NODE_ENV', 'development') === 'development';
}

export function getElasticURL() {
  return getProcessEnv('ES_URL', 'http://localhost:9200');
}

export function getOpenAIKey() {
  return getProcessEnv('OPENAI_KEY', '');
}

export function getSecret() {
  return getProcessEnv('SECRET', 'Do not use default secret in production');
}

export function getAdminEmail() {
  return getProcessEnv('ADMIN_EMAIL', 'admin@example.com');
}

export function getAdminPassword() {
  return getProcessEnv('ADMIN_PASSWORD', 'example');
}

export function getAppName() {
  return getProcessEnv('APP_NAME', 'OpenAI Demo API');
}

export function getAppDescription() {
  return getProcessEnv('APP_DESCRIPTION', 'OpenAI Demo API');
}

export function getAppVersion() {
  return getProcessEnv('APP_VERSION', '1.0');
}
