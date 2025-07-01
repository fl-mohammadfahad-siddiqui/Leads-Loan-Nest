import { Test, TestingModule } from '@nestjs/testing';
import { CkycController } from './ckyc.controller';

describe('CkycController', () => {
  let controller: CkycController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CkycController],
    }).compile();

    controller = module.get<CkycController>(CkycController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
