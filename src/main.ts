import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { newOpenAPIConfig } from './openapi';
import { SwaggerModule } from '@nestjs/swagger';
import { getProcessEnv } from './utils/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const isDevelopment =
    getProcessEnv('NODE_ENV', 'development') === 'development';
  if (isDevelopment) {
    console.log('Running in development mode');
    const openAPIConfig = newOpenAPIConfig();
    const document = SwaggerModule.createDocument(app, openAPIConfig);
    SwaggerModule.setup('api', app, document);
  }
  await app.listen(3000);
}
bootstrap();
