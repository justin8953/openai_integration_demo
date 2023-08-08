import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ChatModelService } from './chat-model.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { OpenAIModel, Prisma } from '@prisma/client';

@Controller('chat-model')
export class ChatModelController {
  constructor(private readonly chatModelService: ChatModelService) {}

  // Retrieve a single model
  @UseGuards(JwtAuthGuard)
  @Get(':modelId')
  async retrieveUser(@Param('modelId') modelId: string): Promise<OpenAIModel> {
    return this.chatModelService.model({ id: modelId });
  }

  // Retrieve multiple models
  @UseGuards(JwtAuthGuard)
  @Get()
  async retrieveModels(
    @Query()
    query: {
      skip?: number;
      take?: number;
      cursor?: Prisma.OpenAIModelWhereUniqueInput;
      where?: Prisma.OpenAIModelWhereInput;
      orderBy?: Prisma.OpenAIModelOrderByWithRelationInput;
    },
  ): Promise<OpenAIModel[]> {
    return this.chatModelService.models(query);
  }
}
