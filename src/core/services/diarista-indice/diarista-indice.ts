import { Diaria } from 'src/api/diarias/entities/diaria.entity';
import { UsuarioApi } from 'src/api/usuarios/entities/usuario.entity';

export abstract class DiaristaServiceSelecao {
  abstract selecionarMalhorDiarista(diaria: Diaria): Promise<UsuarioApi>;
}
