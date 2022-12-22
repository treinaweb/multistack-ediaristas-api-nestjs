import { Injectable } from '@nestjs/common';
import { AvalicaoResponseDto } from '../avaliacoes/dto/avaliacao-response.dto';
import { ClienteMapper } from '../clientes/cliente.mapper';
import { DiaristaMapper } from '../diaristas/diaristas.mapper';
import { DiariaOportunidadeResponseDto } from './dto/diaria-oportunidade-response.dto';
import { DiariaResponseDto } from './dto/diaria-response.dto';
import { Diaria } from './entities/diaria.entity';

@Injectable()
export class DiariaMapper {
  constructor(
    private clienteMapper: ClienteMapper,
    private diaristaMapper: DiaristaMapper,
  ) {}
  toDiariaResponseDto(diaria: Diaria): DiariaResponseDto {
    const diariaResponseDto = new DiariaResponseDto();
    const cliente = this.clienteMapper.toResponse(diaria.cliente);
    const diarista = this.diaristaMapper.toDiaristaDiariaResponseDto(
      diaria.diarista,
    );

    diariaResponseDto.id = diaria.id;
    diariaResponseDto.status = diaria.status;
    diariaResponseDto.valorComissao = diaria.valorComissao;
    diariaResponseDto.motivoCancelamento = diaria.motivoCancelamento;
    diariaResponseDto.nomeServico = diaria.servico.nome;
    diariaResponseDto.complemento = diaria.complemento;
    diariaResponseDto.dataAtendimento = diaria.dataAtendimento;
    diariaResponseDto.tempoAtendimento = diaria.tempoAtendimento;
    diariaResponseDto.preco = diaria.preco;
    diariaResponseDto.logradouro = diaria.logradouro;
    diariaResponseDto.numero = diaria.numero;
    diariaResponseDto.bairro = diaria.bairro;
    diariaResponseDto.estado = diaria.estado;
    diariaResponseDto.cidade = diaria.cidade;
    diariaResponseDto.codigoIbge = diaria.codigoIbge;
    diariaResponseDto.quantidadeBanheiros = diaria.quantidadeBanheiros;
    diariaResponseDto.quantidadeCozinhas = diaria.quantidadeCozinhas;
    diariaResponseDto.quantidadeOutros = diaria.quantidadeOutros;
    diariaResponseDto.quantidadeQuartos = diaria.quantidadeQuartos;
    diariaResponseDto.quantidadeQuintais = diaria.quantidadeQuintais;
    diariaResponseDto.quantidadeSalas = diaria.quantidadeSalas;
    diariaResponseDto.observacoes = diaria.observacoes;
    diariaResponseDto.servico = diaria.servico.id;
    diariaResponseDto.createdAt = diaria.createdAt;
    diariaResponseDto.updatedAt = diaria.updatedAt;
    diariaResponseDto.cliente = cliente;
    diariaResponseDto.diarista = diarista;
    return diariaResponseDto;
  }

  toDiariaOportunidadeResponseDto(
    diaria: Diaria,
  ): DiariaOportunidadeResponseDto {
    const diariaResponseDto = new DiariaOportunidadeResponseDto();
    const cliente = this.clienteMapper.toResponse(diaria.cliente);
    const diarista = this.diaristaMapper.toDiaristaDiariaResponseDto(
      diaria.diarista,
    );

    const avaliacao1 = new AvalicaoResponseDto();
    avaliacao1.descricao = 'Muito bom';
    avaliacao1.fotoAvaliador = null;
    avaliacao1.nomeAvaliador = 'Paulo';
    avaliacao1.nota = 5;

    const avaliacao2 = new AvalicaoResponseDto();
    avaliacao2.descricao = 'Poderia ser melhor';
    avaliacao2.fotoAvaliador = null;
    avaliacao2.nomeAvaliador = 'Márcia';
    avaliacao2.nota = 3;

    const avaliacoes = [avaliacao1, avaliacao2];

    diariaResponseDto.id = diaria.id;
    diariaResponseDto.status = diaria.status;
    diariaResponseDto.valorComissao = diaria.valorComissao;
    diariaResponseDto.motivoCancelamento = diaria.motivoCancelamento;
    diariaResponseDto.nomeServico = diaria.servico.nome;
    diariaResponseDto.complemento = diaria.complemento;
    diariaResponseDto.dataAtendimento = diaria.dataAtendimento;
    diariaResponseDto.tempoAtendimento = diaria.tempoAtendimento;
    diariaResponseDto.preco = diaria.preco;
    diariaResponseDto.logradouro = diaria.logradouro;
    diariaResponseDto.numero = diaria.numero;
    diariaResponseDto.bairro = diaria.bairro;
    diariaResponseDto.estado = diaria.estado;
    diariaResponseDto.cidade = diaria.cidade;
    diariaResponseDto.codigoIbge = diaria.codigoIbge;
    diariaResponseDto.quantidadeBanheiros = diaria.quantidadeBanheiros;
    diariaResponseDto.quantidadeCozinhas = diaria.quantidadeCozinhas;
    diariaResponseDto.quantidadeOutros = diaria.quantidadeOutros;
    diariaResponseDto.quantidadeQuartos = diaria.quantidadeQuartos;
    diariaResponseDto.quantidadeQuintais = diaria.quantidadeQuintais;
    diariaResponseDto.quantidadeSalas = diaria.quantidadeSalas;
    diariaResponseDto.observacoes = diaria.observacoes;
    diariaResponseDto.servico = diaria.servico.id;
    diariaResponseDto.createdAt = diaria.createdAt;
    diariaResponseDto.updatedAt = diaria.updatedAt;
    diariaResponseDto.cliente = cliente;
    diariaResponseDto.diarista = diarista;
    diariaResponseDto.avaliacao = avaliacoes;
    return diariaResponseDto;
  }
}
