import { Test, TestingModule } from '@nestjs/testing';
import { ChatModelController } from './chat-model.controller';

describe('ChatModelController', () => {
  let controller: ChatModelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatModelController],
    }).compile();

    controller = module.get<ChatModelController>(ChatModelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
