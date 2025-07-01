import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Document } from './document.model';

@Injectable()
export class DocumentService {
  constructor(
    @InjectModel(Document)
    private documentModel: typeof Document,
  ) {}

  async uploadDocument(data: Partial<Document>): Promise<Document> {
    return this.documentModel.create(data);
  }

  async getDocumentsByLoanId(loanId: number): Promise<Document[]> {
    return this.documentModel.findAll({ where: { loan_id: loanId } });
  }

  async uploadAll(files: Express.Multer.File[], loanId: number): Promise<Document[]> {
    const docs = await Promise.all(
      files.map(file =>
        this.uploadDocument({
          loan_id: loanId,
          name: file.filename,
          type: file.mimetype,
          size: file.size,
          path: file.path,
        })
      )
    );
    return docs;
  }
}
