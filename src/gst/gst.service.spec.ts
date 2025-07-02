import { Test, TestingModule } from '@nestjs/testing';
import { GstModule } from './gst.module';
import { GstService } from './gst.service';

describe('GstService', () => {
  let service: GstService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [GstModule],
    }).compile();

    service = module.get<GstService>(GstService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
