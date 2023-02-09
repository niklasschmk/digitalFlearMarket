import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteSellerService } from './favorite-seller.service';

describe('FavoriteSellerService', () => {
  let provider: FavoriteSellerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavoriteSellerService],
    }).compile();

    provider = module.get<FavoriteSellerService>(FavoriteSellerService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
