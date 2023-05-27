import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { CountriesDatasourceService } from "src/datasource/countriesdatasource.service";
import { Country } from "./country.entity";
import { Tour } from "src/tours/tour.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { CreateCountryDto } from "./dto/CreateCountryDto";
import { IncompleteCountryDto } from "./dto/incomplete-country.dto";

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>, // "внедряем" репозиторий Country в сервис
    @InjectRepository(Tour)
    private readonly tourRepository: Repository<Tour>, // "внедряем" репозиторий Tour в сервис
  ) {}

//Метод создания страны
  async create(countryDto: CreateCountryDto): Promise<Country>
  {
      //получаем объект CreateCountryDto
      const country = this.countryRepository.create(); //создаем объект Country из репозитория
      country.name = countryDto.name; //заполняем поля объекта Country
      country.information = countryDto.information;
      const tours = await this.tourRepository.findBy({
        //получаем массив Tour по id
        id: In(countryDto.tours),
      });
      if (tours.length == 0){
        throw new NotFoundException(`Tours with ID: ${countryDto.tours} are not found`)
    }
      country.tours = tours;
      await this.countryRepository.save(country); //сохраняем объект Country в БД
      return country; //возвращаем объект Country
  }

  //Метод получения страны по ID
  findOne(id: number): Promise<Country> {
  // Promise<Country> - указывает, что функция возвращает объект Country в виде Promise (c асинхронного потока)
   return this.countryRepository.findOne({
     //получаем объект Country по id
     where: { id }, //указываем условие поиска по id
     relations: { tours: true}, //получаем связанные объекты
   });
 }

  //Метод получения авторов
  async findAll(): Promise<Country[]> {
    const countries = await this.countryRepository.find({
      //получаем связанные объекты
      relations: {
        tours: true,
      },
    }); //получаем массив Country из БД
    return countries; //возвращаем массив Country
  }

  //Метод получения неполной информации о стране
  async findIncomplete(): Promise<IncompleteCountryDto[]> {
    const countries = await this.countryRepository.find(); //получаем массив Country из БД
    const incompleteCountries: IncompleteCountryDto[] = countries.map((country) => {
      //преобразуем массив Author в массив IncompleteCountryDto
      const incompleteCountry = new IncompleteCountryDto();
      incompleteCountry.id = country.id;
      incompleteCountry.name = country.name;
      return incompleteCountry;
    });
    return incompleteCountries; //возвращаем массив IncompleteCountryDto
  }

 //Метод обновления информации о стране
  async update(id: number, updatedCountry: Country) {
    //получаем объект Country для обновления по id
    const country = await this.countryRepository.findOne({ where: { id } }); //получаем объект Country по id из БД
    if(country == null){
      throw new NotFoundException('Country with ID:${id} is not found')
    }
    country.name = updatedCountry.name; //обновляем поля объекта Country
    country.information = updatedCountry.information;
    country.tours = updatedCountry.tours
    await this.countryRepository.save(country); //сохраняем объект Country в БД
    return country; //возвращаем объект Country
  }
  
  //Метод удаления страны
  remove(id: number) {
    this.countryRepository.delete({ id }); //удаляем объект Country из БД
    return HttpStatus.OK;
  }
}