import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, ValidationPipe } from '@nestjs/common';
import { LoansService } from './loans.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';

@Controller('loans')
export class LoansController {
    constructor(private readonly loanService: LoansService) {}

    @Get()
    findAll(){
        return this.loanService.findAll()
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id:number){
        return this.loanService.findOne(id)
    }

    @Post()
    create(@Body(ValidationPipe) dto: CreateLoanDto){
        return this.loanService.create(dto)
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) dto: UpdateLoanDto){
        return this.loanService.update(id,dto)
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id:number){
        return this.loanService.remove(id)
    }

    @Get('full/:id')
    findFullLoan(@Param('id', ParseIntPipe) id: number) {
        return this.loanService.findFullLoanById(id);
    }
}
