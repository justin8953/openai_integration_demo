import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
import { getOpenAIKey } from '../utils';

@Injectable()
export class OpenaiService extends OpenAIApi {
  constructor() {
    const config = new Configuration({
      apiKey: getOpenAIKey(),
    });
    super(config);
  }
}
