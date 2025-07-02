import { Test, TestingModule } from '@nestjs/testing';
import { BusinessModule } from './business.module';
import { BusinessController } from './business.controller';

describe('BusinessController', () => {
  let controller: BusinessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [BusinessModule],
    }).compile();

    controller = module.get<BusinessController>(BusinessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
