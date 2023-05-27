import { ApiProperty } from "@nestjs/swagger";

export class CreateSaleDto {
    @ApiProperty({example: '2023-04-02', description: 'Date of sale'})
    sale_date: string;
    
    @ApiProperty({example: '12', description: 'Client ID'})
    client: number;
   
    @ApiProperty({example: '7', description: 'Tour ID'})
    tour: number;
}