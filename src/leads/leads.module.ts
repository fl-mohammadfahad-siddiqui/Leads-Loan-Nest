import { Module } from '@nestjs/common';
import { LeadsController } from './leads.controller';
import { LeadsService } from './leads.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Lead } from './leads.model';

@Module({
  imports: [SequelizeModule.forFeature([Lead])],
  controllers: [LeadsController],
  providers: [LeadsService],
  exports: [LeadsService]
})
export class LeadsModule {}
