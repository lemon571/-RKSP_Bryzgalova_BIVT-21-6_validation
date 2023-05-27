import { ApiProperty } from '@nestjs/swagger';
import { Country } from 'src/countries/country.entity';
import { Sale } from 'src/sales/sale.entity';
import { Column, Entity, JoinTable, OneToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
  
  @Entity('tours') //указываем что это не просто клаcс, а сущность в рамках TypeOrm, в БД будет храниться как таблица
  export class Tour {
    @ApiProperty({example: '1', description: 'Unique identifier'})
    @PrimaryGeneratedColumn() //колонка - идентификатор, значение генерируется автоматически
    id: number;
    
    @ApiProperty({example: 'Greece Tour', description: 'Tour name'})
    @Column()
    tour_name: string;
    
    @ApiProperty({example: '2023-04-02', description: 'Tour start date'})
    @Column()
    date_start: Date;
    
    @ApiProperty({example: '2023-04-21', description: 'End date of the tour'})
    @Column()
    date_end: Date;
    
    @ApiProperty({example: '60', description: 'Number of seats'})
    @Column()
    people_amount: number;
  
    @ManyToOne((type) => Country, (country) => country.tours)
    @JoinTable({
      //join таблица 
      name: 'country_tour',
      joinColumn: { name: 'tour_id' }, 
      inverseJoinColumn: {name: 'country_id'}
    })
    country: Country
    
    @OneToMany((type) => Sale, (sale) => sale.tour)
    @JoinTable({
      //join таблица 
      name: 'sale_tour',
      joinColumn: { name: 'tour_id' }, 
      inverseJoinColumn: {name: 'sale_id'}
    })
    sales: Sale[]
    
  }