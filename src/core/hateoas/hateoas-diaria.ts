import { Injectable } from '@nestjs/common';
import { DiariasController } from 'src/api/diarias/diarias.controller';
import { Diaria } from 'src/api/diarias/entities/diaria.entity';
import DiariaStatus from 'src/api/diarias/enum/diaria-status.enum';
import { DiaristasController } from 'src/api/diaristas/diaristas.controller';
import { PagamentosController } from 'src/api/pagamentos/pagamentos.controller';
import TipoUsuario from 'src/api/usuarios/enum/tipo-usuario.enum';
import { HateoasLinks } from './hateoas.interface';
import { HateoasBase } from './hatoas-base';

@Injectable()
export class HateoasDiaria extends HateoasBase {
  gerarLinksHateos(tipoUsuario?: number, diaria?: Diaria): HateoasLinks[] {
    this.LINKS = [];

    const params = {
      id: diaria.id,
    };

    if (
      tipoUsuario === TipoUsuario.CLIENTE &&
      diaria.status === DiariaStatus.SEM_PAGAMENTO
    ) {
      this.adicionarLinks(
        'POST',
        'pagar_diaria',
        PagamentosController,
        PagamentosController.prototype.pagar,
        params,
      );
    }

    this.adicionarLinks(
      'GET',
      'self',
      DiariasController,
      DiariasController.prototype.buscarPorId,
      params,
    );

    return this.LINKS;
  }
}
