import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Document } from './document.model';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';

@Module({
  imports: [SequelizeModule.forFeature([Document])],
  providers: [DocumentService],
  controllers: [DocumentController],
  exports: [DocumentService],
})
export class DocumentModule {}
