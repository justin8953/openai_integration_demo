import { Controller, Get } from '@nestjs/common';
import { OpenaiService } from './openai.service';

@Controller('openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Get('models')
  async getModels() {
    const response = await this.openaiService.listModels();
    return response.data;
  }
}
