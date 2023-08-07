import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { ChatType, Prisma } from '@prisma/client';

@Injectable()
export class ChatTypeService {
  constructor(private database: DatabaseService) {}
  // Retrieve a single chat type
  async chatType(
    chatTypeWhereUniqueInput: Prisma.ChatTypeWhereUniqueInput,
  ): Promise<ChatType | null> {
    return this.database.chatType.findUnique({
      where: chatTypeWhereUniqueInput,
    });
  }
  // Retrieve multiple chat types
  async chatTypes(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ChatTypeWhereUniqueInput;
    where?: Prisma.ChatTypeWhereInput;
    orderBy?: Prisma.ChatTypeOrderByWithRelationInput;
  }): Promise<ChatType[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.database.chatType.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }
  // Create a chat type
  async createChatType(data: Prisma.ChatTypeCreateInput): Promise<ChatType> {
    return this.database.chatType.create({
      data,
    });
  }
  // Update a chat type
  async updateChatType(params: {
    where: Prisma.ChatTypeWhereUniqueInput;
    data: Prisma.ChatTypeUpdateInput;
  }): Promise<ChatType> {
    const { where, data } = params;
    return this.database.chatType.update({
      data,
      where,
    });
  }
  // Delete a chat type
  async deleteChatType(
    where: Prisma.ChatTypeWhereUniqueInput,
  ): Promise<ChatType> {
    return this.database.chatType.delete({
      where,
    });
  }
}
