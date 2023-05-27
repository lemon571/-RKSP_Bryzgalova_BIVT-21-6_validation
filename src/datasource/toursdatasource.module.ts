import { Module } from '@nestjs/common';
import { ToursDatasourceService } from './toursdatasource.service'; 

@Module({
  providers: [ToursDatasourceService], 
  exports: [ToursDatasourceService], 
})

export class ToursDatasourceModule {}
