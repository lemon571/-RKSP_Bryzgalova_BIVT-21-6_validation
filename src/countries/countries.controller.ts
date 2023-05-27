import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters, UsePipes, ValidationPipe} from '@nestjs/common';
import { Country } from './country.entity';
import { CountriesService } from './countries.service';
import { CreateCountryDto } from './dto/CreateCountryDto';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { NotFoundExceptionFilter } from 'src/exceptions/notfound.exception.filter';
import { BadRequestExceptionFilter } from 'src/exceptions/badrequest.exception.filter';


@Controller('countries')
@ApiTags("Countries")
@UseFilters(NotFoundExceptionFilter, BadRequestExceptionFilter)
export class CountriesController {
    constructor(private readonly countriesService: CountriesService) {}
    @ApiOperation({summary: 'Search for all countries'})
    @Get()
    findAll() {
        return this.countriesService.findAll();
    }

    @ApiOperation({summary: 'Incomplete country search'})
    @Get('incomplete')
    findIncomplete() {
        return this.countriesService.findIncomplete();
    }

    @ApiOperation({summary: 'Search for a specific country by id'})
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.countriesService.findOne(+id);
    }

    @ApiOperation({summary: 'Changing the country'})
    @Put(':id')
    @UsePipes(ValidationPipe)
    update(@Param('id') id: string, @Body() updateCountry: Country) {
        return this.countriesService.update(+id, updateCountry);
    }

    @ApiOperation({summary: "Creating the country"})
    @Post()
    @UsePipes(ValidationPipe)
    create(@Body() createCountry: CreateCountryDto) {
        return this.countriesService.create(createCountry);
    }

    @ApiOperation({summary: 'Deleting the country'})
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.countriesService.remove(+id);
    }

}