import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { DatabaseModule } from '../database/database.module';
import { ElasticModule } from '../elastic/elastic.module';
import { OpenaiModule } from '../openai/openai.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule, DatabaseModule, ElasticModule, OpenaiModule],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
