import { Module } from '@nestjs/common';
import { WorkflowController } from './workflow.controller';
import { WorkflowService } from './workflow.service';
import { LeadsModule } from 'src/leads/leads.module';
import { BusinessModule } from 'src/business/business.module';
import { LoansModule } from 'src/loans/loans.module';
import { CkycModule } from 'src/ckyc/ckyc.module';
import { CibilModule } from 'src/cibil/cibil.module';
import { GstModule } from 'src/gst/gst.module';
import { DocumentModule } from 'src/document/document.module';

@Module({
  imports: [
    LeadsModule,
    BusinessModule,
    LoansModule,
    CkycModule,
    CibilModule,
    GstModule,
    DocumentModule
  ],
  controllers: [WorkflowController],
  providers: [WorkflowService]
})
export class WorkflowModule {}
