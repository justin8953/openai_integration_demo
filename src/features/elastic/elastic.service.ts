import { Client } from '@elastic/elasticsearch';
import { Injectable } from '@nestjs/common';
import { OpenAIChatMessageDtoType } from 'src/schema';
import {
  getElasticPassword,
  getElasticURL,
  getElasticUsername,
} from '../utils';

@Injectable()
export class ElasticService extends Client {
  constructor() {
    super({
      node: getElasticURL(),
    });
  }
  async chatExists(chatID: string) {
    return await this.indices.exists({
      index: `chat-${chatID}`,
    });
  }
  async getChat(chatID: string) {
    return await this.indices.get({
      index: `chat-${chatID}`,
    });
  }
  async createNewChat(chatID: string) {
    await this.index({
      index: `chat-${chatID}`,
      body: {},
    });
  }
  async deleteChat(chatID: string) {
    await this.indices.delete({
      index: `chat-${chatID}`,
    });
  }
  async createNewMessage(chatID: string, message: OpenAIChatMessageDtoType) {
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
  async deleteMessage(chatID: string, messageID: string) {
    await this.delete({
      index: `chat-${chatID}`,
      id: messageID,
    });
  }
}
