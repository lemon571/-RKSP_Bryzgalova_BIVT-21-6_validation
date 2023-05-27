import { Module } from '@nestjs/common';
import { ClientsDatasourceService } from './clientsdatasource.sevice';

@Module({
  providers: [ClientsDatasourceService], 
  exports: [ClientsDatasourceService], 
})

export class ClientsDatasourceModule {}
