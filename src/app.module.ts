import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './features/user/user.module';
import { ChatTypeModule } from './features/chat-type/chat-type.module';
import { AuthModule } from './features/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.development.env', '.production.env'],
    }),
    AuthModule,
    UserModule,
    ChatTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
