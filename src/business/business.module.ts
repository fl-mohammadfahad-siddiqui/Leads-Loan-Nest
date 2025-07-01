import { Module } from '@nestjs/common';
import { BusinessController } from './business.controller';
import { BusinessService } from './business.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Business } from './business.model';

@Module({
  imports: [SequelizeModule.forFeature([Business])],
  controllers: [BusinessController],
  providers: [BusinessService],
  exports: [BusinessService]
})
export class BusinessModule {}
