import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Loan } from './loans.model';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { Lead } from '../leads/leads.model';
import { Business } from '../business/business.model';
import { Document } from '../document/document.model';
import { Ckyc } from '../ckyc/ckyc.model';
import { Cibil } from '../cibil/cibil.model';
import { Gst } from '../gst/gst.model';

@Injectable()
export class LoansService {

    constructor( @InjectModel(Loan) private readonly loanModel: typeof Loan) {}

    async findAll(){
        return this.loanModel.findAll()
    }

    async findOne(id: number){
        const loan = await this.loanModel.findByPk(id)
        if(!loan) throw new NotFoundException('Loan Not Found')
        return loan
    }

    async create(dto: CreateLoanDto){
        return this.loanModel.create(dto)
    }

    async update(id:number, dto: UpdateLoanDto){
        const loan = await this.findOne(id)
        await loan.update(dto)
        return loan
    }

    async remove(id: number){
        const loan = await this.findOne(id)
        await loan.destroy()
        return{ message: 'Loan Deleted', loan}
    }

    async findFullLoanById(id: number) {
        // Fetch loan with lead, business, and documents
        const loan = await this.loanModel.findByPk(id, {
            include: [
                { model: Lead },
                { model: Business },
                { model: Document },
            ],
        });
        if (!loan) throw new NotFoundException('Loan Not Found');

        // Fetch CKYC, CIBIL, GST by lead_id
        const lead_id = loan.lead_id;
        const [ckyc, cibil, gst, documents] = await Promise.all([
            Ckyc.findOne({ where: { lead_id } }),
            Cibil.findOne({ where: { lead_id } }),
            Gst.findAll({ where: { lead_id } }),
            Document.findAll({ where: { loan_id: id } }),
        ]);

        // Only important fields
        const ckycData = ckyc ? { ckyc_id: ckyc.ckyc_id, pan: ckyc.pan } : null;
        const cibilData = cibil ? { cibil_id: cibil.cibil_id, score: cibil.score, score_date: cibil.score_date } : null;
        const gstData = gst.map(g => ({ gst_id: g.gst_id, gstin: g.gstin, taxpayer_name: g.taxpayer_name, status: g.status }));

        return {
            ...loan.toJSON(),
            lead: loan.lead,
            business: loan.business,
            ckyc: ckycData,
            cibil: cibilData,
            gst: gstData,
            documents: documents.map(doc => ({
                ...doc.toJSON(),
                view_url: `/documents/view/${doc.name}`
            })),
        };
    }
}
