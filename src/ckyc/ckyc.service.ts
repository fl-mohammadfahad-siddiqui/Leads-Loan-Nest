import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { InjectModel } from '@nestjs/sequelize';
import { Ckyc } from './ckyc.model';

@Injectable()
export class CkycService {
  constructor(@InjectModel(Ckyc) private ckycModel: typeof Ckyc) {}

  async searchCkyc(lead_id: number, pan: string) {
    const response = await axios.post('https://dqw6uizajg.execute-api.ap-south-1.amazonaws.com/mocks/ckyc/searchAPI/api/data/SearchCKYC', { pan });
    const record = await this.ckycModel.create({ lead_id, pan, response_data: response.data });
    return record;
  }

  async findAll() {
    return this.ckycModel.findAll();  
  }

  async findOne(id: number) {
    return this.ckycModel.findByPk(id);
  }

}