import * as fs from 'fs';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { newOpenAPIConfig } from './openapi';
import { SwaggerModule } from '@nestjs/swagger';
import { getAppCertPath, getAppKeyPath, isDevelopment } from './features/utils';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync(getAppKeyPath()),
    cert: fs.readFileSync(getAppCertPath()),
  };
  const app = await NestFactory.create(AppModule, { httpsOptions });
  const isDev = isDevelopment();
  if (isDev) {
    console.log('Running in development mode');
    const openAPIConfig = newOpenAPIConfig();
    const document = SwaggerModule.createDocument(app, openAPIConfig);
    SwaggerModule.setup('api', app, document);
  }
  await app.listen(3000);
}
bootstrap();
