import { Module } from '@nestjs/common';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';
import { SalesDatasourceModule } from 'src/datasource/salesdatasource.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './sale.entity';
import { Tour } from 'src/tours/tour.entity';
import { Client } from 'src/clients/client.entity';

@Module({
  controllers: [SalesController],
  providers: [SalesService],
  imports: [SalesDatasourceModule, TypeOrmModule.forFeature([Sale, Tour, Client])],
})
export class SalesModule {}
