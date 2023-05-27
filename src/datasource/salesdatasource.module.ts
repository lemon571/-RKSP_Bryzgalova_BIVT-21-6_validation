import { Module } from '@nestjs/common';
import { SalesDatasourceService } from './salesdatasource.service';

@Module({
  providers: [SalesDatasourceService], 
  exports: [SalesDatasourceService], 
})

export class SalesDatasourceModule {}
