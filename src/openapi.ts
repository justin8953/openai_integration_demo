import { DocumentBuilder } from '@nestjs/swagger';
import { getAppDescription, getAppName, getAppVersion } from './features/utils';

export function newOpenAPIConfig() {
  const title = getAppName();
  const description = getAppDescription();
  const version = getAppVersion();

  return new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .addTag('user')
    .addTag('chat-type')
    .build();
}
