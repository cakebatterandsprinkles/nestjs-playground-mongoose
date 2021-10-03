import { Controller, Get } from '@nestjs/common';
import { ToysService } from './toys.service';

@Controller('toys')
export class ToysController {
  constructor(private readonly toysService: ToysService) {}
  @Get('/toys')
  getAllToys() {
    return this.toysService.getAllToys();
  }
}
