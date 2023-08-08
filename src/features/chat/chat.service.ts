import { Injectable, OnModuleInit } from '@nestjs/common';
import { ElasticService } from '../elastic/elastic.service';
import { OpenaiService } from '../openai/openai.service';
import { UserService } from '../user/user.service';
import { DatabaseService } from '../database/database.service';
import { Prisma } from '@prisma/client';

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
  async messages(userId: number, chatId: string) {
    const chat = await this.chat(userId, { id: chatId });
    return await this.elasticService.getChatMessages(chat.id);
  }
  async createNewChat(userId: number, message: string) {
    const user = await this.userService.user({
      id: userId,
    });
    console.log('create new chat in database');
    const chat = await this.databaseService.chat.create({
      data: {
        model: user.openAIModelId,
        User: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    console.log('create new chat in elastic');
    await this.elasticService.createNewChat(chat.id);
    console.log('create new conversation in openai');
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
