import { Test, TestingModule } from '@nestjs/testing';
import { ChatModelService } from './chat-model.service';

describe('ChatModelService', () => {
  let service: ChatModelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatModelService],
    }).compile();

    service = module.get<ChatModelService>(ChatModelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
