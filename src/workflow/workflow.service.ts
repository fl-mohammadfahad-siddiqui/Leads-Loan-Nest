import { Injectable } from '@nestjs/common';
import { LeadsService } from 'src/leads/leads.service';
import { BusinessService } from 'src/business/business.service';
import { LoansService } from 'src/loans/loans.service';
import { stepHandlers } from './step-handlers';
import { WorkflowContext } from './workflow.context';
import * as fs from 'fs';
import * as path from 'path';
import { CkycService } from 'src/ckyc/ckyc.service';
import { CibilService } from 'src/cibil/cibil.service';
import { GstService } from 'src/gst/gst.service';
import { DocumentService } from 'src/document/document.service';

const configPath = path.join(
  process.cwd(),
  process.env.NODE_ENV === 'production' ? 'dist' : 'src',
  'workflow',
  'config',
  'workflows.json',
);


@Injectable()
export class WorkflowService {
  constructor(
    private readonly leadsService: LeadsService,
    private readonly businessService: BusinessService,
    private readonly loansService: LoansService,
    private readonly ckycService: CkycService,
    private readonly cibilService: CibilService,
    private readonly gstService: GstService,
    private readonly documentService: DocumentService,
  ) {}

  getAllWorkflows() {
    return JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  }

  saveWorkflow(name: string, steps: string[]) {
    const workflows = this.getAllWorkflows();
    workflows[name] = steps;
    fs.writeFileSync(configPath, JSON.stringify(workflows, null, 2));
    return workflows;
  }

  deleteWorkflow(name: string) {
    const workflows = this.getAllWorkflows();
    delete workflows[name];
    fs.writeFileSync(configPath, JSON.stringify(workflows, null, 2));
    return workflows;
  }

  async executeWorkflow(name: string, input: any): Promise<WorkflowContext> {
    const workflows = this.getAllWorkflows();
    const steps = workflows[name];
    if (!steps) throw new Error(`Workflow "${name}" not found`);

    const ctx: WorkflowContext = { input };

    for (const step of steps) {
      const handler = stepHandlers[step];
      if (!handler) throw new Error(`No handler for step "${step}"`);

      await handler(ctx, {
        leadsService: this.leadsService,
        businessService: this.businessService,
        loansService: this.loansService,
        ckycService: this.ckycService,
        cibilService: this.cibilService,
        gstService: this.gstService,
        documentService: this.documentService,
      });
    }

    return ctx;
  }
}
