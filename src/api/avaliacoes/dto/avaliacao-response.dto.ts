import { Expose } from 'class-transformer';

export class AvalicaoResponseDto {
  descricao: string;
  nota: number;

  @Expose({ name: 'nome_avaliador' })
  nomeAvaliador: string;

  @Expose({ name: 'foto_avaliador' })
  fotoAvaliador: string;
}
