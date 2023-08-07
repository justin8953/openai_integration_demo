import { Test, TestingModule } from '@nestjs/testing';
import { ChatTypeService } from './chat-type.service';

describe('ChatTypeService', () => {
  let service: ChatTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatTypeService],
    }).compile();

    service = module.get<ChatTypeService>(ChatTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
