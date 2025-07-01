import { Injectable, NotFoundException } from '@nestjs/common';
import { Business } from './business.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';

@Injectable()
export class BusinessService {
    constructor(@InjectModel(Business) private businessModel: typeof Business) {}

    async create(dto: CreateBusinessDto){
        return this.businessModel.create(dto);
    }

    async findAll(){
        return this.businessModel.findAll();
    }

    async findOne(id:number){
        const business = await this.businessModel.findByPk(id)
        if(!business) throw new NotFoundException('Business not found')
        return business
    }

    async update(id:number, dto: UpdateBusinessDto){
        const business = await this.findOne(id);
        return business.update(dto)
    }

    async remove(id: number){
        const business = await this.findOne(id);
        await business.destroy();
        return{ message: 'Business deleted', business}
    }
}
