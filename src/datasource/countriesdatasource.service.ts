import { Injectable } from '@nestjs/common';
import { Country } from 'src/countries/country.entity';

@Injectable()
export class CountriesDatasourceService {
  private countries: Country[] = [ ];
  getCountries(): Country[] {
    return this.countries;
  }
}