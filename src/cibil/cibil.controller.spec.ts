import { Test, TestingModule } from '@nestjs/testing';
import { CibilController } from './cibil.controller';

describe('CibilController', () => {
  let controller: CibilController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CibilController],
    }).compile();

    controller = module.get<CibilController>(CibilController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
