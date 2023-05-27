import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateTourDto {
    @IsNotEmpty()
    @IsString()  
    @ApiProperty({example: 'Greece Tour', description: 'Tour name'})
    tour_name: string;
    
    @ApiProperty({example: '2023-04-02', description: 'Tour start date'})
    date_start: Date;
    
    @ApiProperty({example: '2023-04-21', description: 'End date of the tour'})
    date_end: Date;
    
    @IsInt()
    @ApiProperty({example: '60', description: 'Number of seats'})
    people_amount: number;
    
    @ApiProperty({example: '1', description: 'ID of the tour country'})
    country: number;
    
    @ApiProperty({example: '[1, 2]', description: 'Ids of sales of this tour'})
    sales: number[]
  }