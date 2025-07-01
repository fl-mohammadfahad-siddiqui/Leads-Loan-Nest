import { Document as LoanDocument } from 'src/document/document.model';
import { Ckyc } from 'src/ckyc/ckyc.model';
import { Cibil } from 'src/cibil/cibil.model';
import { Gst } from 'src/gst/gst.model';

export interface WorkflowContext {
  input: any;
  lead?: any;
  business?: any;
  loan?: any;
  ckycResult?: Ckyc;
  cibilResult?: Cibil;
  gstResult?: Gst;
  documents?: LoanDocument[];
}
