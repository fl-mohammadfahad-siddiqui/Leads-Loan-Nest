import { Test, TestingModule } from '@nestjs/testing';
import { CkycService } from './ckyc.service';

describe('CkycService', () => {
  let service: CkycService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CkycService],
    }).compile();

    service = module.get<CkycService>(CkycService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
