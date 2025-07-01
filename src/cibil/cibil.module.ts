import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cibil } from './cibil.model';
import { CibilService } from './cibil.service';

@Module({
  imports: [SequelizeModule.forFeature([Cibil])],
  providers: [CibilService],
  exports: [CibilService],
})
export class CibilModule {}