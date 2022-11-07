import { Injectable } from '@nestjs/common';
import { ConsultaEnderecoController } from 'src/api/consulta-endereco/consulta-endereco.controller';
import { DiaristasController } from 'src/api/diaristas/diaristas.controller';
import { ServicosController } from 'src/api/servicos/servicos.controller';
import { HateoasLinks } from './hateoas.interface';
import { HateoasBase } from './hatoas-base';

@Injectable()
export class HateosIndex extends HateoasBase {
  gerarLinksHateos(): HateoasLinks[] {
    this.LINKS = [];

    this.adicionarLinks(
      'GET',
      'diaristas_localidades',
      DiaristasController,
      DiaristasController.prototype.buscarPorCep,
    );

    this.adicionarLinks(
      'GET',
      'verificar_disponibilidade_atendimento',
      DiaristasController,
      DiaristasController.prototype.verificarDisponibilidadePorCep,
    );

    this.adicionarLinks(
      'GET',
      'endereco_cep',
      ConsultaEnderecoController,
      ConsultaEnderecoController.prototype.buscarEnderecoPorCep,
    );

    this.adicionarLinks(
      'GET',
      'listar_servicos',
      ServicosController,
      ServicosController.prototype.findAll,
    );

    return this.LINKS;
  }
}
