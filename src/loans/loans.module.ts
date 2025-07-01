import { Module } from '@nestjs/common';
import { LoansController } from './loans.controller';
import { LoansService } from './loans.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Loan } from './loans.model';

@Module({
  imports: [SequelizeModule.forFeature([Loan])],
  controllers: [LoansController],
  providers: [LoansService],
  exports: [LoansService]
})
export class LoansModule {}
