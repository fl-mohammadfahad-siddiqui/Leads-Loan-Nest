import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Lead, LeadCreationAttributes } from './leads.model';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { UniqueConstraintError } from 'sequelize';
import { BadRequestException } from '@nestjs/common';

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
        try {
            return await this.leadModel.create(leadData, { returning: true });
        } catch (err: any) {
            if (err instanceof UniqueConstraintError) {
                const field = err.errors?.[0]?.path || 'field';
                const value = err.errors?.[0]?.value || '';
                throw new BadRequestException(`${field} "${value}" must be unique`);
            }
            throw err;
        }
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
        try{
            return await lead.update(updateData)
        } catch(err:any) {
            if(err instanceof UniqueConstraintError){
                const field = err.errors?.[0]?.path || 'field';
                const value = err.errors?.[0]?.value || '';
                throw new BadRequestException(`${field} "${value}" must be unique`)
            }
            throw err;
        }
    }

    async remove(id:number){
        const lead = await this.findOne(id)
        await lead.destroy();
        return{ message: 'Lead deleted', lead};
    }

}
  