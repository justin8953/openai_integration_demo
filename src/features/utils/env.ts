export function getProcessEnv(key: string, defaultValue = ''): string {
  return process.env[key] || defaultValue;
}

export function isDevelopment() {
  return getProcessEnv('NODE_ENV', 'development') === 'development';
}

export function getElasticURL() {
  return getProcessEnv('ES_URL', 'https://localhost:9200');
}

export function getElasticUsername() {
  return getProcessEnv('ES_USERNAME', 'elastic');
}

export function getElasticPassword() {
  return getProcessEnv('ES_PASSWORD', 'openai@2023');
}

export function getElasticCertificatePath() {
  return getProcessEnv('ES_CERT', '/cert/http_ca.crt');
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

export function getAppKeyPath() {
  return getProcessEnv('APP_KEY_PATH', '/cert/app.key');
}

export function getAppCertPath() {
  return getProcessEnv('APP_CERT_PATH', '/cert/app.crt');
}
