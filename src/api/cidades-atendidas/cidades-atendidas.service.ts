import { Injectable } from '@nestjs/common';
import { CreateCidadesAtendidaDto } from './dto/create-cidades-atendida.dto';
import { UpdateCidadesAtendidaDto } from './dto/update-cidades-atendida.dto';

@Injectable()
export class CidadesAtendidasService {
  create(createCidadesAtendidaDto: CreateCidadesAtendidaDto) {
    return 'This action adds a new cidadesAtendida';
  }

  findAll() {
    return `This action returns all cidadesAtendidas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cidadesAtendida`;
  }

  update(id: number, updateCidadesAtendidaDto: UpdateCidadesAtendidaDto) {
    return `This action updates a #${id} cidadesAtendida`;
  }

  remove(id: number) {
    return `This action removes a #${id} cidadesAtendida`;
  }
}
