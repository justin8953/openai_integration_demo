import { Test, TestingModule } from '@nestjs/testing';
import { ChatTypeController } from './chat-type.controller';

describe('ChatTypeController', () => {
  let controller: ChatTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatTypeController],
    }).compile();

    controller = module.get<ChatTypeController>(ChatTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
