import { Injectable } from '@nestjs/common';
import { Client } from 'src/clients/client.entity';

@Injectable()
export class ClientsDatasourceService {
  private clients: Client[] = [];
  getClients(): Client[] {
    return this.clients;
  }
}