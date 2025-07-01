import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Lead, LeadCreationAttributes } from './leads.model';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';

@Injectable()
export class LeadsService {
    constructor(
        @InjectModel(Lead) private leadModel: typeof Lead,
    ) {}

    async create(dto: CreateLeadDto) {
        const leadData: LeadCreationAttributes = {
            ...dto,
            dob: new Date(dto.dob),
        };
        return this.leadModel.create(leadData, { returning: true });
    }

    async findAll(){
        return this.leadModel.findAll();
    }

    async findOne(id: number){
        const lead = await this.leadModel.findByPk(id);
        if(!lead) throw new NotFoundException('Lead not found');
        return lead;
    }

    async update(id: number, dto: UpdateLeadDto){
        const lead = await this.findOne(id);
        const updateData = {
            ...dto,
            dob: dto.dob? new Date(dto.dob) : undefined,
        }
        return lead.update(updateData)
    }

    async remove(id:number){
        const lead = await this.findOne(id)
        await lead.destroy();
        return{ message: 'Lead deleted', lead};
    }

}
  