import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteProductService } from './favorite-product.service';

describe('FavoriteProductService', () => {
  let provider: FavoriteProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavoriteProductService],
    }).compile();

    provider = module.get<FavoriteProductService>(FavoriteProductService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
