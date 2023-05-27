import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsArray } from "class-validator";



export class CreateCountryDto {
    @ApiProperty({example: 'Argentina', description: 'Country name'})
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({example: 'A country in the southern half of South America.', description: 'Country information'})
    @IsNotEmpty()
    @IsString()
    information: string;
    
    @ApiProperty({example: '[1, 2]', description: 'List of tour ID'})
    @IsArray()
    tours: number[]
}

