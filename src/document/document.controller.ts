import { Controller, Get, Param, Res } from '@nestjs/common';
import { DocumentService } from './document.service';
import { Response } from 'express';
import * as path from 'path';

@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get(':loan_id')
  async getDocumentsByLoan(@Param('loan_id') loanId: number) {
    const documents = await this.documentService.getDocumentsByLoanId(loanId);

    const docsWithLinks = documents.map((doc) => ({
      ...doc.toJSON(),
      view_url: `/documents/view/${doc.name}`,
    }));

    return docsWithLinks;
  }

  @Get('view/:filename')
  async viewDocument(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = path.join(process.cwd(), 'uploads', filename);
    return res.sendFile(filePath, (err) => {
      if (err) {
        res.status(404).json({ error: 'File not found' });
      }
    });
  }
}