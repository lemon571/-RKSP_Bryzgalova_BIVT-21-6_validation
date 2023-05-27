import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, UseFilters, UsePipes} from '@nestjs/common';
import { Client } from './client.entity';
import { ClientsService } from './clents.service';
import { CreateClientDto } from './dto/CreateClientDto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

@Controller('clients')
@ApiTags('Clients')// Тег для документации
export class ClientsController {
    constructor(private readonly clientsService: ClientsService) {}
    @ApiOperation({summary: 'Search for all clients'})
    @Get()
    findAll() {
        return this.clientsService.findAll();
    }

    @ApiOperation({summary: 'Incomplete client search'})
    //Возможность отправки не полной информации по клиентам
    @Get('incomplete')
    findIncomplete() {
        return this.clientsService.findIncomplete();
    }

    @ApiOperation({summary: 'Search for a specific client by id'})
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.clientsService.findOne(+id);
    }

    @ApiOperation({summary: 'Changing the client'})
    @Put(':id')
    @UsePipes(ValidationPipe)
    update(@Param('id') id: string, @Body() updateClient: Client) {
        return this.clientsService.update(+id, updateClient);
    }

    @ApiOperation({summary: "Creating the client"})
    @Post()
    @UsePipes(ValidationPipe)
    create(@Body() createClient: CreateClientDto) {
        return this.clientsService.create(createClient);
    }
    
    @ApiOperation({summary: 'Deleting the client'})
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.clientsService.remove(+id);
    }

}