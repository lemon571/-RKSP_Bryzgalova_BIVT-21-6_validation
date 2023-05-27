import { Injectable } from '@nestjs/common';
import { Tour } from 'src/tours/tour.entity';

@Injectable()
export class ToursDatasourceService {
  private tours: Tour[] = [];
  getTours(): Tour[] {
    return this.tours;
  }
}
