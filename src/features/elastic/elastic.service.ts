import { Client } from '@elastic/elasticsearch';
import { Injectable } from '@nestjs/common';
import { getProcessEnv } from 'src/utils/env';

@Injectable()
export class ElasticService extends Client {
  constructor() {
    super({
      node: getProcessEnv('ES_URL'),
    });
  }

  async createNewChat(chatID: string) {
    await this.index({
      index: `chat-${chatID}`,
    });
  }
  async createNewMessage(chatID: string, message: string) {
    const timestamp = new Date().getTime();
    await this.index({
      index: `chat-${chatID}`,
      id: `message-${timestamp}`,
      body: {
        message,
        timestamp,
      },
    });
  }
  async getChatMessages(chatID: string) {
    const documents = await this.search({
      index: `chat-${chatID}`,
      body: {
        query: {
          match_all: {},
        },
      },
    });
    return documents.hits.hits;
  }
}
