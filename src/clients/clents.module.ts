import { Module } from '@nestjs/common';
import { ClientsController } from './clents.controller'; 
import { ClientsService } from './clents.service'; 
import { ClientsDatasourceModule } from 'src/datasource/clientsdatasourse.module'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from 'src/sales/sale.entity';
import { Client } from './client.entity';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService],
  imports: [ClientsDatasourceModule,
    TypeOrmModule.forFeature([Sale, Client])]
    // !!! В модуле автор мы используем две сущности, поэтому все используемые сущности необходимо импортирвоать!
})
export class ClientsModule {}

