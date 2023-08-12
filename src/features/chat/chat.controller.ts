import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { ChatMessageDtoType } from 'src/schema';
import { Prisma } from '@prisma/client';

@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async createNewChat(
    @Request() req: any,
    @Body() { message }: ChatMessageDtoType,
  ) {
    const { id } = req.user;
    return this.chatService.createNewChat(id, message);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  async getChats(
    @Request() req: any,
    @Query()
    query: {
      skip?: number;
      take?: number;
      cursor?: Prisma.ChatWhereUniqueInput;
      where?: Prisma.ChatWhereInput;
      orderBy?: Prisma.ChatOrderByWithRelationInput;
    },
  ) {
    const { id } = req.user;

    return this.chatService.chats(id, query);
  }
  @UseGuards(JwtAuthGuard)
  @Get(':chatId')
  async getChatMessages(@Request() req: any, @Param('chatId') chatId: string) {
    const { id } = req.user;
    return this.chatService.messages(id, chatId);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  @Delete(':chatId')
  async deleteChat(@Request() req: any, @Param('chatId') chatId: string) {
    const { id } = req.user;
    return this.chatService.deleteExistedChat(id, chatId);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  @Post('/delete')
  async bulkDeleteChat(
    @Request() req: any,
    @Body() { chatIds }: { chatIds: string[] },
  ) {
    const { id } = req.user;
    return this.chatService.deleteExistedChats(id, chatIds);
  }
}
