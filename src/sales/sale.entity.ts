import { Tour } from 'src/tours/tour.entity';
import { Client } from 'src/clients/client.entity';
import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('sales') //указываем что это не просто клаcс, а сущность в рамках TypeOrm, в БД будет храниться как таблица
export class Sale {
  @ApiProperty({example: '1', description: 'Unique identifier'})
  @PrimaryGeneratedColumn() //колонка - идентификатор, значение генерируется автоматически
  id: number;
  
  @ApiProperty({example: "2001-09-04T00:00:00.000Z", description: 'Date of sale'})
  @Column()
  sale_date: Date;

  @ManyToOne((type) => Tour, (tour) => tour.sales)
  @JoinTable({
    //join таблица 
    name: 'sale_tour',
    joinColumn: { name: 'sale_id' }, 
    inverseJoinColumn: {name: 'tour_id'}
  })
  tour: Tour
  
  @ManyToOne((type) => Client, (client) => client.sales)
  @JoinTable({
    //join таблица 
    name: 'sale_client',
    joinColumn: { name: 'sale_id' }, 
    inverseJoinColumn: {name: 'client_id'}
  })
  client: Client
}