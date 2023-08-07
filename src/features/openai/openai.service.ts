import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
import { getProcessEnv } from 'src/utils/env';

@Injectable()
export class OpenaiService extends OpenAIApi {
  constructor() {
    const config = new Configuration({
      apiKey: getProcessEnv('OPENAI_KEY', ''),
    });
    super(config);
  }
}
