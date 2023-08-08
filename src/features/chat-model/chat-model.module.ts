import { Module } from '@nestjs/common';
import { ChatModelService } from './chat-model.service';
import { DatabaseModule } from '../database/database.module';
import { ChatModelController } from './chat-model.controller';

@Module({
  imports: [DatabaseModule],
  providers: [ChatModelService],
  exports: [ChatModelService],
  controllers: [ChatModelController],
})
export class ChatModelModule {}
