import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters} from '@nestjs/common';
import { Sale } from './sale.entity';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/CreateSaleDto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BadRequestExceptionFilter } from 'src/exceptions/badrequest.exception.filter';
import { InternalServerExceptionFilter } from 'src/exceptions/internalserver.error.filters';
import { NotFoundExceptionFilter } from 'src/exceptions/notfound.exception.filter';

@Controller('sales')
@ApiTags("Sales")
@UseFilters(NotFoundExceptionFilter, BadRequestExceptionFilter, InternalServerExceptionFilter)
export class SalesController {
    constructor(private readonly salesService: SalesService) {}
    @ApiOperation({summary: 'Search for all sales'})
    @Get()
    findAll() {
        return this.salesService.findAll();
    }
    
    @ApiOperation({summary: 'Incomplete sale search'})
    @Get('incomplete')
    findIncomplete() {
        return this.salesService.findIncomplete();
    }
    
    @ApiOperation({summary: 'Search for a specific sale by id'})
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.salesService.findOne(+id);
    }
    
    @ApiOperation({summary: 'Changing the sale'})
    @Put(':id')
    update(@Param('id') id: string, @Body() updateSale: Sale) {
        return this.salesService.update(+id, updateSale);
    }
    
    @ApiOperation({summary: "Creating the sale"})
    @Post()
    create(@Body() createSale: CreateSaleDto) {
        return this.salesService.create(createSale);
    }
    
    @ApiOperation({summary: 'Deleting the sale'})
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.salesService.remove(+id);
    }
}