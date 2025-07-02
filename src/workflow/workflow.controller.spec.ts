import { Test, TestingModule } from '@nestjs/testing';
import { WorkflowModule } from './workflow.module';
import { WorkflowController } from './workflow.controller';

describe('WorkflowController', () => {
  let controller: WorkflowController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [WorkflowModule],
    }).compile();

    controller = module.get<WorkflowController>(WorkflowController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
