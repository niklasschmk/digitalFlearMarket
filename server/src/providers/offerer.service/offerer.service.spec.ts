import { Test, TestingModule } from '@nestjs/testing';
import { OffererService } from './offerer.service';

describe('OffererService', () => {
  let provider: OffererService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OffererService],
    }).compile();

    provider = module.get<OffererService>(OffererService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
