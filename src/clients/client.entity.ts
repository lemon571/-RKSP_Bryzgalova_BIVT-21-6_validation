import { ApiProperty } from '@nestjs/swagger';
import { Sale } from 'src/sales/sale.entity';
import { Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('clients') //указываем что это не просто клаcс, а сущность в рамках TypeOrm, в БД будет храниться как таблица
export class Client {
  @ApiProperty({example: '1', description: "Unique identifier"})
  @PrimaryGeneratedColumn() //колонка - идентификатор, значение генерируется автоматически
  id: number;
  
  @ApiProperty({example: 'Иван', description: "First name of the author"})
  @Column({}) //колонка таблицы, сюда можно добавить большое количество параметров для БД, например тип, уникальность, триггер и т.д.
  name: string;
  
  @ApiProperty({example: 'Иванович', description: "Last name of the author"})
  @Column()
  surname: string;
  
  @ApiProperty({example: 'qwe@gmail.com', description: "Email address"})
  @Column()
  email_address: string;
  
  @ApiProperty({example: '77777777777', description: "Phone number"})
  @Column()
  phone_number: string;
  
  @ApiProperty({example: 'Москва, ЦАО, р-н Тверской, ул. Охотный Ряд, 2', description: "Address"})
  @Column()
  address: string;

  @OneToMany(() => Sale, (sale) => sale.client)
  @JoinTable({
    //join таблица 
    name: 'client_sale',
    joinColumn: { name: 'client_id' }, //для связи с идентификатором автора
    inverseJoinColumn: {name: "sale_id"}
  })
  sales: Sale[]
}
