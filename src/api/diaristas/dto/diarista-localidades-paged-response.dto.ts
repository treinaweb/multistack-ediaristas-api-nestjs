import { DiaristaLocalidadeResponse } from './create-diarista.dto';

export class DiaristaLocalidadesPagedResponse {
  diaristas: DiaristaLocalidadeResponse[];
  quantidade_diaristas: number;
  totalElementos: number;

  constructor(
    diaristas: DiaristaLocalidadeResponse[],
    tamanhoPagina: number,
    totalElementos: number,
  ) {
    this.diaristas = diaristas;
    this.quantidade_diaristas =
      totalElementos > tamanhoPagina ? totalElementos - tamanhoPagina : 0;
  }
}
