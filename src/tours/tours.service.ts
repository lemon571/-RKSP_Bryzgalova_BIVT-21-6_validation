import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { ToursDatasourceService } from "src/datasource/toursdatasource.service";
import { Tour } from "./tour.entity";
import { Country } from "src/countries/country.entity";
import { Sale } from "src/sales/sale.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { CreateTourDto } from "./dto/CreateTourDto";
import { IncompleteTourDto } from "./dto/incomplete-tour.dto";

@Injectable()
export class ToursService {
    constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>, // "внедряем" репозиторий Country в сервис
    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>, // "внедряем" репозиторий Sale в сервис
    @InjectRepository(Tour)
    private readonly tourRepository: Repository<Tour>, // "внедряем" репозиторий Tour в сервис
  ) {}

 //Метод создания тура
  async create(tourDto: CreateTourDto): Promise<Tour>
  {
      //получаем объект CreateTourDto
      const tour = this.tourRepository.create(); //создаем объект Tour из репозитория
      tour.tour_name = tourDto.tour_name; //заполняем поля объекта Tour
      tour.date_start = new Date(tourDto.date_start);
      tour.date_end = new Date(tourDto.date_end);
      tour.people_amount = tourDto.people_amount;
      
      const country = await this.countryRepository.findOne({
        //получаем массив Country по id
        where: { id: tourDto.country },
      });
      tour.country = country;

      const sales = await this.saleRepository.findBy({
        //получаем массив Sale по id
        id: In(tourDto.sales),
      });

      await this.tourRepository.save(tour); //сохраняем объект Tour в БД
      return tour; //возвращаем объект Tour
  }

//Метод получения тура по ID
  findOne(id: number): Promise<Tour> {
  // Promise<Tour> - указывает, что функция возвращает объект Tour в виде Promise (c асинхронного потока)
   return this.tourRepository.findOne({
     //получаем объект Tour по id
     where: { id }, //указываем условие поиска по id
     relations: { country: true, sales: true}, //получаем связанные объекты
   });
 }

//Метод получения тура
  async findAll(): Promise<Tour[]> {
    const tours = await this.tourRepository.find({
      //получаем связанные объекты
      relations: {
        country: true,
        sales: true
      },
    }); //получаем массив Tour из БД
    return tours; //возвращаем массив Tour
  }

  //Метод получения неполной информации о клиенте
  async findIncomplete(): Promise<IncompleteTourDto[]> {
    const tours = await this.tourRepository.find(); //получаем массив Tour из БД
    const incompleteTours: IncompleteTourDto[] = tours.map((tour) => {
      //преобразуем массив Tour в массив IncompleteTourDto
      const incompleteTour = new IncompleteTourDto();
      incompleteTour.id = tour.id;
      incompleteTour.tour_name = tour.tour_name;
      incompleteTour.date_start = tour.date_start;
      incompleteTour.date_end = tour.date_end;
      return incompleteTour;
    });
    return incompleteTours; //возвращаем массив IncompleteTourDto
  }

 //Метод обновления информации о туре
  async update(id: number, updatedTour: Tour) {
    //получаем объект Author для обновления по id
    const tour = await this.tourRepository.findOne({ where: { id } }); //получаем объект Tour по id из БД
    if(tour == null){
      throw new NotFoundException('Tour with ID: ${id} is not found')
    }
    tour.tour_name = updatedTour.tour_name; //обновляем поля объекта Tour
    tour.date_start = updatedTour.date_start;
    tour.date_end = updatedTour.date_end;
    tour.people_amount = updatedTour.people_amount;
    tour.country = updatedTour.country;
    tour.sales = updatedTour.sales;
    await this.tourRepository.save(tour); //сохраняем объект Tour в БД
    return tour; //возвращаем объект Tour
  }
  
  //Метод удаления тура
  remove(id: number) {
    this.tourRepository.delete({ id }); //удаляем объект Tour из БД
    return HttpStatus.OK;
  }
}
