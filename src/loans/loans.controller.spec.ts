import { Test, TestingModule } from '@nestjs/testing';
import { LoansModule } from './loans.module';
import { LoansController } from './loans.controller';

describe('LoansController', () => {
  let controller: LoansController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoansModule],
    }).compile();

    controller = module.get<LoansController>(LoansController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
