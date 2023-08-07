import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { ChatMessageDtoType } from 'src/schema';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  //   TODO: Add a route to create a new chat
  @UseGuards(JwtAuthGuard)
  @Post('/new')
  async createNewChat(@Request() req: any, @Body() body: ChatMessageDtoType) {
    console.log('body', body);
    console.log(req.user);
    return true;
  }
}
