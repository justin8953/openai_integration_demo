import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ChatTypeService } from './chat-type.service';
import { ChatType, Prisma } from '@prisma/client';
import { ChatTypeDtoType } from 'src/schema';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('chat-type')
export class ChatTypeController {
  constructor(private readonly chatTypeService: ChatTypeService) {}

  // Retrieve a single chat type
  @UseGuards(JwtAuthGuard)
  @Get(':typeId')
  async retrieveChatType(@Param('typeId') typeId: number): Promise<ChatType> {
    return this.chatTypeService.chatType({ id: Number(typeId) });
  }

  // Retrieve multiple chat types
  @UseGuards(JwtAuthGuard)
  @Get()
  async retrieveChatTypes(
    @Query()
    query: {
      skip?: number;
      take?: number;
      cursor?: Prisma.ChatTypeWhereUniqueInput;
      where?: Prisma.ChatTypeWhereInput;
      orderBy?: Prisma.ChatTypeOrderByWithRelationInput;
    },
  ): Promise<ChatType[]> {
    return this.chatTypeService.chatTypes(query);
  }

  // Create a chat type
  @UseGuards(JwtAuthGuard)
  @Post()
  async createChatType(@Body() chatType: ChatTypeDtoType): Promise<ChatType> {
    return this.chatTypeService.createChatType({
      name: chatType.name,
      description: chatType.description,
    });
  }

  //  Update a chat type
  @UseGuards(JwtAuthGuard)
  @Put(':typeId')
  async updateChatType(
    @Param('typeId') typeId: number,
    @Body() chatType: ChatTypeDtoType,
  ): Promise<ChatType> {
    return this.chatTypeService.updateChatType({
      where: {
        id: Number(typeId),
      },
      data: {
        name: chatType.name,
        description: chatType.description,
      },
    });
  }

  // Delete a chat type
  @UseGuards(JwtAuthGuard)
  @Delete(':typeId')
  async deleteChatType(@Param('typeId') typeId: number): Promise<ChatType> {
    return this.chatTypeService.deleteChatType({
      id: Number(typeId),
    });
  }
}
