import { Test, TestingModule } from '@nestjs/testing';
import { DocumentModule } from './document.module';
import { DocumentController } from './document.controller';

describe('DocumentController', () => {
  let controller: DocumentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DocumentModule],
    }).compile();

    controller = module.get<DocumentController>(DocumentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
