import { Injectable } from '@nestjs/common';
import { UsuarioApi } from '../usuarios/entities/usuario.entity';
import { DiaristaLocalidadeResponse } from './dto/create-diarista.dto';

@Injectable()
export class DiaristaMapper {
  toDiaristaLocalidadeResponseDto(usuario: UsuarioApi) {
    const diaristaDTO = new DiaristaLocalidadeResponse();
    diaristaDTO.nomeCompleto = usuario.nomeCompleto;
    diaristaDTO.reputacao = usuario.reputacao;
    diaristaDTO.fotoUsuario = null;
    diaristaDTO.cidade = null;
    return diaristaDTO;
  }
}
