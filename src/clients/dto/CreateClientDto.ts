import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator';
import {IsEmail, IsString, MinLength, MaxLength} from 'class-validator';

export class CreateClientDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: 'Петр Иванович', description: 'First name of the author'})
    name: string;
    
    @ApiProperty({example: 'Иванов', description: 'Last name of the author'})
    @IsNotEmpty()
    @IsString()
    surname: string;
    
    @ApiProperty({example: 'aaa@mail.ru', description: 'Email address'})
    @IsEmail()
    email_address: string;
    
    @ApiProperty({example: '77777777777', description: 'Phone number'})
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(11)
    phone_number: string;
    
    @ApiProperty({example: 'Москва, ЦАО, р-н Тверской, ул. Охотный Ряд, 2', description: 'Address'})
    address: string;
    
    @ApiProperty({example: '[1, 2]', description: 'List of customer purchase ID'})
    sales: number[]
  }
  