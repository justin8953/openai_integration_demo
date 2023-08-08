import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { OpenAIModel, Prisma } from '@prisma/client';

@Injectable()
export class ChatModelService {
  constructor(private readonly database: DatabaseService) {}
  async model(
    chatModelWhereUniqueInput: Prisma.OpenAIModelWhereUniqueInput,
  ): Promise<OpenAIModel | null> {
    return this.database.openAIModel.findUnique({
      where: chatModelWhereUniqueInput,
    });
  }
  async models(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.OpenAIModelWhereUniqueInput;
    where?: Prisma.OpenAIModelWhereInput;
    orderBy?: Prisma.OpenAIModelOrderByWithRelationInput;
  }): Promise<OpenAIModel[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.database.openAIModel.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }
  async createModel(data: Prisma.OpenAIModelCreateInput): Promise<OpenAIModel> {
    return this.database.openAIModel.create({
      data,
    });
  }
}
