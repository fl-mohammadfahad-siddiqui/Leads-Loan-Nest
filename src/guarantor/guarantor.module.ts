import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Guarantor } from './guarantor.model';
import { GuarantorService } from './guarantor.service';
import { GuarantorController } from './guarantor.controller';

@Module({
  imports: [SequelizeModule.forFeature([Guarantor])],
  providers: [GuarantorService],
  controllers: [GuarantorController],
  exports: [GuarantorService],
})
export class GuarantorModule {} 