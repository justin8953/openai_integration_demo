import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './features/user/user.module';
import { AuthModule } from './features/auth/auth.module';
import { OpenaiModule } from './features/openai/openai.module';
import { ChatModule } from './features/chat/chat.module';
import { RoleModule } from './features/role/role.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.development.env', '.production.env'],
    }),
    AuthModule,
    RoleModule,
    UserModule,
    ChatModule,
    OpenaiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
