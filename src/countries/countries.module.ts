import { Module } from '@nestjs/common';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { CountriesDatasourceModule } from 'src/datasource/countriesdatasource.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tour } from 'src/tours/tour.entity';
import { Country } from './country.entity';

@Module({
  controllers: [CountriesController],
  providers: [CountriesService],
  imports: [CountriesDatasourceModule, TypeOrmModule.forFeature([Tour, Country])]
})
export class CountriesModule {}
