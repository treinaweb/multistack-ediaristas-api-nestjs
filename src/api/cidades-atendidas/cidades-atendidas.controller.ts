import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CidadesAtendidasService } from './cidades-atendidas.service';
import { CreateCidadesAtendidaDto } from './dto/create-cidades-atendida.dto';
import { UpdateCidadesAtendidaDto } from './dto/update-cidades-atendida.dto';

@Controller('cidades-atendidas')
export class CidadesAtendidasController {
  constructor(
    private readonly cidadesAtendidasService: CidadesAtendidasService,
  ) {}

  @Post()
  create(@Body() createCidadesAtendidaDto: CreateCidadesAtendidaDto) {
    return this.cidadesAtendidasService.create(createCidadesAtendidaDto);
  }

  @Get()
  findAll() {
    return this.cidadesAtendidasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cidadesAtendidasService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCidadesAtendidaDto: UpdateCidadesAtendidaDto,
  ) {
    return this.cidadesAtendidasService.update(+id, updateCidadesAtendidaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cidadesAtendidasService.remove(+id);
  }
}
