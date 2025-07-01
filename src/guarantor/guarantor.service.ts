import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Guarantor } from './guarantor.model';
import { Lead } from '../leads/leads.model';

@Injectable()
export class GuarantorService {
  constructor(
    @InjectModel(Guarantor)
    private guarantorModel: typeof Guarantor,
  ) {}

  async findAll() {
    return this.guarantorModel.findAll({ include: [Lead] });
  }

  async findOne(id: number) {
    const guarantor = await this.guarantorModel.findByPk(id, { include: [Lead] });
    if (!guarantor) throw new NotFoundException('Guarantor not found');
    return guarantor;
  }

  async create(data: Partial<Guarantor>) {
    return this.guarantorModel.create(data);
  }

  async update(id: number, data: Partial<Guarantor>) {
    const guarantor = await this.findOne(id);
    return guarantor.update(data);
  }

  async remove(id: number) {
    const guarantor = await this.findOne(id);
    await guarantor.destroy();
    return { message: 'Guarantor deleted', guarantor };
  }
} 