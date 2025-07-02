import { Test, TestingModule } from '@nestjs/testing';
import { CkycModule } from './ckyc.module';
import { CkycService } from './ckyc.service';

describe('CkycService', () => {
  let service: CkycService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CkycModule],
    }).compile();

    service = module.get<CkycService>(CkycService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
