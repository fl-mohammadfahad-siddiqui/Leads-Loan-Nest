import { Test, TestingModule } from '@nestjs/testing';
import { CibilModule } from './cibil.module';
import { CibilService } from './cibil.service';

describe('CibilService', () => {
  let service: CibilService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CibilModule],
    }).compile();

    service = module.get<CibilService>(CibilService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
