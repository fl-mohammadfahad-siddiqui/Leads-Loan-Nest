import { LeadsService } from 'src/leads/leads.service';
import { BusinessService } from 'src/business/business.service';
import { LoansService } from 'src/loans/loans.service';
import { CkycService } from 'src/ckyc/ckyc.service';
import { CibilService } from 'src/cibil/cibil.service';
import { GstService } from 'src/gst/gst.service';
import { DocumentService } from 'src/document/document.service';

export interface ServicesBundle {
  leadsService: LeadsService;
  businessService: BusinessService;
  loansService: LoansService;
  ckycService: CkycService;
  cibilService: CibilService;
  gstService: GstService;
  documentService: DocumentService;
}
