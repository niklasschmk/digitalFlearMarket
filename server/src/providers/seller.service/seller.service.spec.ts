import { Test, TestingModule } from '@nestjs/testing';
import { SellerService } from './seller.service';

describe('SellerService', () => {
  let provider: SellerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SellerService],
    }).compile();

    provider = module.get<SellerService>(SellerService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
