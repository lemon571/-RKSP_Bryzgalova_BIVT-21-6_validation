import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters, UsePipes, ValidationPipe} from '@nestjs/common';
import { Tour } from './tour.entity';
import { ToursService } from './tours.service';
import { CreateTourDto } from './dto/CreateTourDto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { InternalServerExceptionFilter } from 'src/exceptions/internalserver.error.filters';
import { BadRequestExceptionFilter } from 'src/exceptions/badrequest.exception.filter';
import { NotFoundExceptionFilter } from 'src/exceptions/notfound.exception.filter';

@Controller('tours')
@ApiTags("Tours")
@UseFilters(NotFoundExceptionFilter, BadRequestExceptionFilter, InternalServerExceptionFilter)
export class ToursController {
    constructor(private readonly toursService: ToursService) {}
    @ApiOperation({summary: 'Search for all tours'})
    @Get()
    findAll() {
        return this.toursService.findAll();
    }

    @ApiOperation({summary: 'Incomplete tour search'})
    @Get('incomplete')
    findIncomplete() {
        return this.toursService.findIncomplete();
    }

    @ApiOperation({summary: 'Search for a specific tour by id'})
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.toursService.findOne(+id);
    }

    @ApiOperation({summary: 'Changing the tour'})
    @Put(':id')
    @UsePipes(ValidationPipe)
    update(@Param('id') id: string, @Body() updateTour: Tour) {
        return this.toursService.update(+id, updateTour);
    }

    @ApiOperation({summary: "Creating the tour"})
    @Post()
    @UsePipes(ValidationPipe)
    create(@Body() createTour: CreateTourDto) {
        return this.toursService.create(createTour);
    }
    
    @ApiOperation({summary: 'Deleting the tour'})
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.toursService.remove(+id);
    }
}