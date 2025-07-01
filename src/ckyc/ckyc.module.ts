import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Ckyc } from './ckyc.model';
import { CkycService } from './ckyc.service';

@Module({
  imports: [SequelizeModule.forFeature([Ckyc])],
  providers: [CkycService],
  exports: [CkycService],
})
export class CkycModule {}