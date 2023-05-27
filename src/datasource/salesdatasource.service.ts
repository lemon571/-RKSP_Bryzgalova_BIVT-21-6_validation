import { Injectable } from '@nestjs/common';
import { Sale } from 'src/sales/sale.entity';

@Injectable()
export class SalesDatasourceService {
  private sales: Sale[] = [];
  getSales(): Sale[] {
    return this.sales;
  }
}