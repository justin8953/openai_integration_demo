import { DocumentBuilder } from '@nestjs/swagger';
import { getProcessEnv } from './utils/env';

export function newOpenAPIConfig() {
  const title = getProcessEnv('APP_NAME', 'OpenAI Demo API');
  const description = getProcessEnv('APP_DESCRIPTION', 'OpenAI Demo API');
  const version = getProcessEnv('APP_VERSION', '1.0');

  return new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .addTag('user')
    .addTag('chat-type')
    .build();
}
