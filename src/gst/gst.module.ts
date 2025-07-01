import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Gst } from './gst.model';
import { GstService } from './gst.service';

@Module({
  imports: [SequelizeModule.forFeature([Gst])],
  providers: [GstService],
  exports: [GstService]
})
export class GstModule {}
