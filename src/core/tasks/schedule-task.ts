import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DiariaRepository } from 'src/api/diarias/diarias.repository';
import { Diaria } from 'src/api/diarias/entities/diaria.entity';
import DiariaStatus from 'src/api/diarias/enum/diaria-status.enum';
import { DiaristaIndiceService } from '../services/diarista-indice/diarista-indice.service';

@Injectable()
export class ScheduleTask {
  constructor(
    private diariaRepository: DiariaRepository,
    private indice: DiaristaIndiceService,
  ) {}
  private readonly logger = new Logger(ScheduleTask.name);

  @Cron(CronExpression.EVERY_10_SECONDS)
  async selecionarDiaristaDiaria() {
    this.logger.debug(
      'Task de seleção de diaristas para diárias aptas iniciada',
    );

    const diariasAptasParaSelecao =
      await this.diariaRepository.repository.getAptasParaSelecaoDiarista();

    diariasAptasParaSelecao.forEach(
      async (diaria) => await this.selecionarDiarista(diaria),
    );

    this.logger.debug('Task de seleção de diarias finalizada');
  }

  private async selecionarDiarista(diaria: Diaria) {
    this.logger.debug(
      `Selecionando melhor diarista para a diária de id: ${diaria.id}`,
    );

    const melhorDiarista = await this.indice.selecionarMalhorDiarista(diaria);
    diaria.diarista = melhorDiarista;
    diaria.status = DiariaStatus.CONFIRMADO;
    await this.diariaRepository.repository.save(diaria);
    this.logger.debug(
      `Selecionado o diarista de id: ${diaria.diarista.id} para a diaria de id: ${diaria.id}`,
    );
  }
}
