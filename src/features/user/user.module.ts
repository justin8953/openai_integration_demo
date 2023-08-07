import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { ChatTypeService } from '../chat-type/chat-type.service';
import { UserController } from './user.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  exports: [UserService],
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, ChatTypeService],
})
export class UserModule {}
