import { Module } from '@nestjs/common';
import { CountriesDatasourceService } from './countriesdatasource.service';  

@Module({
  providers: [CountriesDatasourceService], 
  exports: [CountriesDatasourceService], 
})

export class CountriesDatasourceModule {}
