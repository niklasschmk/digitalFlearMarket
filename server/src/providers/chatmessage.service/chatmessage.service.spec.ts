import { Test, TestingModule } from '@nestjs/testing';
import { ChatmessageService } from './chatmessage.service';

describe('ChatmessageService', () => {
  let provider: ChatmessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatmessageService],
    }).compile();

    provider = module.get<ChatmessageService>(ChatmessageService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
