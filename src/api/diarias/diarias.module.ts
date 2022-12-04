import { Module } from '@nestjs/common';
import { DiariasService } from './diarias.service';
import { DiariasController } from './diarias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diaria } from './entities/diaria.entity';
import { UsuarioApi } from '../usuarios/entities/usuario.entity';
import { Servico } from '../servicos/entities/servico.entity';
import { DiaristaRepository } from '../diaristas/diaristas.repository';
import { DiariaMapper } from './diarias.mapper';
import { DiariaRepository } from './diarias.repository';
import { ClienteMapper } from '../clientes/cliente.mapper';
import { ServicoExiste } from 'src/core/validators/diaria/validator-servico';
import { DataAtendimentoInicio } from 'src/core/validators/diaria/validator-data-atendimento-inicio';
import { ValidatorDiaria } from 'src/core/validators/diaria/validator-diaria';
import { ViaCepService } from 'src/core/via-cep.service';

@Module({
  imports: [TypeOrmModule.forFeature([Diaria, UsuarioApi, Servico])],
  controllers: [DiariasController],
  providers: [
    DiariasService,
    DiaristaRepository,
    DiariasService,
    DiariaMapper,
    DiariaRepository,
    ClienteMapper,
    ServicoExiste,
    DataAtendimentoInicio,
    ValidatorDiaria,
    ViaCepService,
  ],
})
export class DiariasModule {}
