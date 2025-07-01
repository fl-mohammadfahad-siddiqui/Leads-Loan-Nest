import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, ValidationPipe } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';

@Controller('leads')
export class LeadsController {
    constructor(private readonly leadService:LeadsService) {}

    @Get()
    findAll(){
        return this.leadService.findAll()
    }

    @Get(':id')
    findOne(@Param('id',ParseIntPipe) id:number){
        return this.leadService.findOne(id)
    }

    @Post()
    create(@Body(ValidationPipe) dto:CreateLeadDto){
        return this.leadService.create(dto)
    }

    @Put(':id')
    update(@Param('id',ParseIntPipe) id:number, @Body(ValidationPipe) dto:UpdateLeadDto){
        return this.leadService.update(id,dto)
    }

    @Delete(':id')
    remove(@Param('id',ParseIntPipe) id:number){
        return this.leadService.remove(id)
    }
}
