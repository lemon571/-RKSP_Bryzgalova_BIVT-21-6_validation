import { Module } from '@nestjs/common';
import { Tour } from './tour.entity';
import { ToursController } from './tours.controller';
import { ToursService } from './tours.service';
import { ToursDatasourceModule } from 'src/datasource/toursdatasource.module'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from 'src/sales/sale.entity';
import { Country } from 'src/countries/country.entity';

@Module({
  controllers: [ToursController],
  providers: [ToursService],
  imports: [ToursDatasourceModule, TypeOrmModule.forFeature([Tour, Sale, Country])],
})
export class ToursModule {}
