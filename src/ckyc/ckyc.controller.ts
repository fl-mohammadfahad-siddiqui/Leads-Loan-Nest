import { Controller, Get, Param } from '@nestjs/common';
import { CkycService } from './ckyc.service';

@Controller('ckyc')
export class CkycController {
  constructor(private readonly ckycService: CkycService) {}

  @Get()
  findAll() {
    return this.ckycService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.ckycService.findOne(id);
  }
}
