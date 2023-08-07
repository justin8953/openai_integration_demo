import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './features/user/user.module';
import { ChatTypeModule } from './features/chat-type/chat-type.module';
import { AuthModule } from './features/auth/auth.module';
import { OpenaiModule } from './features/openai/openai.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.development.env', '.production.env'],
    }),
    AuthModule,
    UserModule,
    ChatTypeModule,
    OpenaiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
