import { Controller, Get } from '@nestjs/common';
import { ServicosService } from './servicos.service';

@Controller('api/servicos')
export class ServicosController {
  constructor(private readonly servicosService: ServicosService) {}
  @Get()
  findAll() {
    return this.servicosService.findAll();
  }
}
