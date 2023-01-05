import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiariaRepository } from 'src/api/diarias/diarias.repository';
import { Diaria } from 'src/api/diarias/entities/diaria.entity';
import { ConsultaCidade } from './services/consulta-cidade/consulta-cidade';
import { IbgeService } from './services/consulta-cidade/conulta-cidade.service';
import { ConsultaDistanciaCep } from './services/consulta-distancia/consulta-distancia';
import { GoogleMatrixService } from './services/consulta-distancia/consulta-distancia.service';
import { DiaristaServiceSelecao } from './services/diarista-indice/diarista-indice';
import { DiaristaIndiceService } from './services/diarista-indice/diarista-indice.service';
import { ScheduleTask } from './tasks/schedule-task';

@Module({
  imports: [ScheduleModule.forRoot(), TypeOrmModule.forFeature([Diaria])],
  controllers: [],
  providers: [
    DiariaRepository,
    ScheduleTask,
    DiaristaIndiceService,
    GoogleMatrixService,
    {
      provide: ConsultaCidade,
      useClass: IbgeService,
    },
    {
      provide: ConsultaDistanciaCep,
      useClass: GoogleMatrixService,
    },
    {
      provide: DiaristaServiceSelecao,
      useClass: DiaristaIndiceService,
    },
  ],
})
export class CoreModule {}
