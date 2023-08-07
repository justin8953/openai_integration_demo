import { Module } from '@nestjs/common';
import { ChatTypeController } from './chat-type.controller';
import { ChatTypeService } from './chat-type.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  exports: [ChatTypeService],
  imports: [DatabaseModule],
  controllers: [ChatTypeController],
  providers: [ChatTypeService],
})
export class ChatTypeModule {}
