import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { GuarantorService } from './guarantor.service';

@Controller('guarantor')
export class GuarantorController {
  constructor(private readonly guarantorService: GuarantorService) {}

  @Get()
  findAll() {
    return this.guarantorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.guarantorService.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.guarantorService.create(body);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return this.guarantorService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.guarantorService.remove(id);
  }
} 