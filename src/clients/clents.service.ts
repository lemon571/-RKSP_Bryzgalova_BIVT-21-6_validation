import { NotFoundException, Injectable, HttpStatus } from "@nestjs/common";
import { ClientsDatasourceService } from "src/datasource/clientsdatasource.sevice";
import { Client } from "./client.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Sale } from "src/sales/sale.entity";
import { CreateClientDto } from "./dto/CreateClientDto";
import { IncompleteClientDto } from "./dto/incomplete-client.dto";

@Injectable()
export class ClientsService {
    constructor(
      @InjectRepository(Client)
      private readonly clientRepository: Repository<Client>, // "внедряем" репозиторий Client в сервис
      @InjectRepository(Sale)
      private readonly saleRepository: Repository<Sale>, // "внедряем" репозиторий Sale в сервис
    ) {}

 //Метод создания клиента
    async create(clientDto: CreateClientDto): Promise<Client>
    {
        //получаем объект CreateClientDto
        const client = this.clientRepository.create(); //создаем объект Client из репозитория
        client.name = clientDto.name; //заполняем поля объекта Client
        client.surname = clientDto.surname;
        client.email_address = clientDto.email_address;
        client.phone_number = clientDto.phone_number;
        client.address = clientDto.address;
        const sales = await this.saleRepository.findBy({
          //получаем массив Sale по id
          id: In(clientDto.sales),
        });
        client.sales = sales;
        await this.clientRepository.save(client); //сохраняем объект Client в БД
        return client; //возвращаем объект Client
      }

  //Метод получения клиента по ID
    findOne(id: number): Promise<Client> {
      // Promise<Client> - указывает, что функция возвращает объект Client в виде Promise (c асинхронного потока)
      return this.clientRepository.findOne({
        //получаем объект Client по id
        where: { id }, //указываем условие поиска по id
        relations: { sales: true}, //получаем связанные объекты
      });
    }

  //Метод получения клиентов
    async findAll(): Promise<Client[]> {
      const clients = await this.clientRepository.find({
        //получаем связанные объекты
        relations: {
          sales: true,
        },
      }); //получаем массив Client из БД
      return clients; //возвращаем массив Client
    }

  //Метод получения неполной информации о клиенте
    async findIncomplete(): Promise<IncompleteClientDto[]> {
      const clients = await this.clientRepository.find(); //получаем массив Client из БД
      const incompleteClients: IncompleteClientDto[] = clients.map((client) => {
      //преобразуем массив Client в массив IncompleteAuthorDto
        const incompleteClient = new IncompleteClientDto();
        incompleteClient.id = client.id;
        incompleteClient.name = client.name;
        incompleteClient.surname = client.surname;
        incompleteClient.phone_number = client.phone_number;
        return incompleteClient;
    });
    return incompleteClients; //возвращаем массив IncompleteAuthorDto
  } 

 //Метод обновления информации о клиенте
    async update(id: number, updatedClient: Client) {
      //получаем объект Client для обновления по id
      const client = await this.clientRepository.findOne({ where: { id } }); //получаем объект Client по id из БД
      if (client == null){
        throw new NotFoundException('Client with ID:${id} is not found')
      }
      client.name = updatedClient.name; //обновляем поля объекта Client
      client.surname = updatedClient.surname;
      client.email_address = updatedClient.email_address;
      client.phone_number = updatedClient.phone_number;
      client.address = updatedClient.address;
      client.sales = updatedClient.sales
      await this.clientRepository.save(client); //сохраняем объект Client в БД
      return client; //возвращаем объект Client
    }
    
  //Метод удаления клиента
    remove(id: number) {
        this.clientRepository.delete({ id }); //удаляем объект Client из БД
        return HttpStatus.OK;
    }
}
