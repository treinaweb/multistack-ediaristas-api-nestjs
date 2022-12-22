import { Injectable } from '@nestjs/common';
import { DiariaMapper } from '../diarias/diarias.mapper';
import { DiariaRepository } from '../diarias/diarias.repository';
import { UsuarioApi } from '../usuarios/entities/usuario.entity';

@Injectable()
export class OportunidadesService {
  constructor(
    private diariaRepository: DiariaRepository,
    private diariaMapper: DiariaMapper,
  ) {}

  async buscarOportunidades(usuarioLogado: UsuarioApi) {
    const cidades = usuarioLogado.cidadesAtendidas.map(
      (cidade) => cidade.codigoIbge,
    );

    const diarias = await this.diariaRepository.repository.findOportunidades(
      cidades,
      usuarioLogado,
    );

    return diarias.map((diaria) =>
      this.diariaMapper.toDiariaOportunidadeResponseDto(diaria),
    );
  }
}
