import { Test, TestingModule } from '@nestjs/testing';
import { OffererController } from './offerer.controller';

describe('OffererController', () => {
  let controller: OffererController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OffererController],
    }).compile();

    controller = module.get<OffererController>(OffererController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
