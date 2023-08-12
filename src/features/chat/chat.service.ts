import { Injectable, OnModuleInit } from '@nestjs/common';
import { ElasticService } from '../elastic/elastic.service';
import { OpenaiService } from '../openai/openai.service';
import { UserService } from '../user/user.service';
import { DatabaseService } from '../database/database.service';
import { Prisma } from '@prisma/client';
import { isDevelopment } from '../utils';
import { integer } from '@elastic/elasticsearch/lib/api/types';

@Injectable()
export class ChatService {
  constructor(
    private readonly elasticService: ElasticService,
    private readonly openaiService: OpenaiService,
    private readonly userService: UserService,
    private readonly databaseService: DatabaseService,
  ) {}
  async chats(
    userId: number,
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.ChatWhereUniqueInput;
      where?: Prisma.ChatWhereInput;
      orderBy?: Prisma.ChatOrderByWithRelationInput;
    },
  ) {
    const { skip, take, cursor, where, orderBy } = params;

    return await this.databaseService.chat.findMany({
      skip,
      take,
      cursor,
      where: {
        ...where,
        User: {
          id: userId,
        },
      },
      orderBy,
    });
  }
  async chat(
    userId: number,
    chatWhereUniqueInput: Prisma.ChatWhereUniqueInput,
  ) {
    return await this.databaseService.chat.findFirst({
      where: {
        ...chatWhereUniqueInput,
        User: {
          id: userId,
        },
      },
    });
  }
  async newChat(modelId: string, userId: integer) {
    return await this.databaseService.chat.create({
      data: {
        model: modelId,
        User: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }
  async updateChat(modelId: string, chatId: string) {
    return await this.databaseService.chat.update({
      where: {
        id: chatId,
      },
      data: {
        model: modelId,
      },
    });
  }
  async deleteChat(chatId: string) {
    return await this.databaseService.chat.delete({
      where: {
        id: chatId,
      },
    });
  }
  async messages(userId: number, chatId: string) {
    const chat = await this.chat(userId, { id: chatId });
    return await this.elasticService.getChatMessages(chat.id);
  }
  async createNewChat(userId: number, message: string) {
    const user = await this.userService.user({
      id: userId,
    });
    console.log('create new chat in database');
    const chat = await this.newChat(user.openAIModelId, userId);
    console.log('create new chat in elastic');
    await this.elasticService.createNewChat(chat.id);
    console.log('create new conversation in openai', message);
    if (isDevelopment()) {
      await this.elasticService.createNewMessage(chat.id, {
        role: 'user',
        content: message,
      });
    } else {
      const { data } = await this.openaiService.createChatCompletion({
        model: chat.model,
        messages: [
          {
            role: 'user',
            content: message,
          },
        ],
      });
      console.log('insert conversation to elastic');
      data.choices.forEach(async (choice) => {
        await this.elasticService.createNewMessage(chat.id, choice.message);
      });
    }
  }
  async deleteExistedChat(userId: number, chatId: string) {
    const chat = await this.chat(userId, { id: chatId });
    const isExisted = await this.elasticService.chatExists(chat.id);
    if (isExisted) {
      console.log('delete existed chat in elastic');
      await this.elasticService.deleteChat(chat.id);
    }
    await this.deleteChat(chat.id);
  }

  async deleteExistedChats(userId: number, chatIds: string[]) {
    chatIds.forEach(async (chatId) => {
      await this.deleteExistedChat(userId, chatId);
    });
  }
}
