import { PartialType } from '@nestjs/mapped-types';
import { CreateCidadesAtendidaDto } from './create-cidades-atendida.dto';

export class UpdateCidadesAtendidaDto extends PartialType(CreateCidadesAtendidaDto) {}
