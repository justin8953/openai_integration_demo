import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { ChatMessageDtoType } from 'src/schema';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async createNewChat(
    @Request() req: any,
    @Body() { message }: ChatMessageDtoType,
  ) {
    console.debug(req.user);
    const { id } = req.user;
    return this.chatService.createNewChat(id, message);
  }
}
