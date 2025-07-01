import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LeadsModule } from './leads/leads.module';
import { BusinessModule } from './business/business.module';
import { LoansModule } from './loans/loans.module';
import { CkycModule } from './ckyc/ckyc.module';
import { WorkflowModule } from './workflow/workflow.module';
import { CibilModule } from './cibil/cibil.module';
import { GstModule } from './gst/gst.module';
import { DocumentModule } from './document/document.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { GuarantorModule } from './guarantor/guarantor.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        dialect: 'mysql',
        host: config.get('DB_HOST'),
        port: +config.get('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        autoLoadModels: true,
        synchronize: true,
        logging: false,
      })
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    
    LeadsModule,
    BusinessModule,
    LoansModule,
    CkycModule,
    WorkflowModule,
    CibilModule,
    GstModule,
    DocumentModule,
    GuarantorModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
