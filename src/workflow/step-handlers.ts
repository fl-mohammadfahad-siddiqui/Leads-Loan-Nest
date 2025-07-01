import { LeadsService } from 'src/leads/leads.service';
import { BusinessService } from 'src/business/business.service';
import { LoansService } from 'src/loans/loans.service';
import { CkycService } from 'src/ckyc/ckyc.service';
import { WorkflowContext } from './workflow.context';
import { CibilService } from 'src/cibil/cibil.service';
import { GstService } from 'src/gst/gst.service';
import { DocumentService } from 'src/document/document.service';
import { ServicesBundle } from './services.bundle';

type Services = {
  leadsService: LeadsService;
  businessService: BusinessService;
  loansService: LoansService;
  ckycService: CkycService;
  cibilService: CibilService;
  gstService: GstService;
  documentService: DocumentService;
};

export const stepHandlers = {
  lead: async (ctx: WorkflowContext, services: Services) => {
    ctx.lead = await services.leadsService.create(ctx.input.lead);
  },

  ckyc: async (ctx: WorkflowContext, services: Services) => {
    const record = await services.ckycService.searchCkyc(ctx.lead.lead_id, ctx.lead.pan_card);
    ctx.ckycResult = record;
  },

  business: async (ctx: WorkflowContext, services: Services) => {
    ctx.business = await services.businessService.create({
      ...ctx.input.business,
      lead_id: ctx.lead.lead_id,
    });
  },

  loan: async (ctx: WorkflowContext, services: Services) => {
    const loanData: any = {
      ...ctx.input.loan,
      lead_id: ctx.lead.lead_id,
    };
    if (ctx.business) {
      loanData.business_id = ctx.business.business_id;
    }
    ctx.loan = await services.loansService.create(loanData);
  },

  cibil: async (ctx, services) => {
    const cibilData = await services.cibilService.checkCibil(ctx.lead);
    await services.cibilService.saveCibilReport(ctx.lead.lead_id, cibilData);
    ctx.cibilResult = cibilData;
  },

  gst: async (ctx, services) => {
    ctx.gst = await services.gstService.fetchAndSaveGSTData(ctx.lead.lead_id, ctx.lead.pan_card);
  },

  
  document: async (ctx, services) => {
    const files = ctx.input.documents; // these should be pre-processed using Multer middleware in route
    const loanId = ctx.loan.loan_id;

    console.log('Received files in workflow document step:', files);

    await services.documentService.uploadAll(files, loanId);

    ctx.documents = await services.documentService.getDocumentsByLoanId(loanId);
  },



};
