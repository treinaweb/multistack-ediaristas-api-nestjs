import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ValidatorDiaria } from 'src/core/validators/diaria/validator-diaria';
import { Repository } from 'typeorm';
import { Servico } from '../servicos/entities/servico.entity';
import { UsuarioApi } from '../usuarios/entities/usuario.entity';
import { DiariaMapper } from './diarias.mapper';
import { DiariaRepository } from './diarias.repository';
import { DiariaRequestDto } from './dto/diaria-request.dto';
import DiariaStatus from './enum/diaria-status.enum';

@Injectable()
export class DiariasService {
  constructor(
    @InjectRepository(Servico)
    private servicoRepository: Repository<Servico>,
    private diariaRepository: DiariaRepository,
    private diariaMapper: DiariaMapper,
    private validatorDiaria: ValidatorDiaria,
  ) {}
  async cadastrar(
    diariaRequestDto: DiariaRequestDto,
    usuarioLogado: UsuarioApi,
  ) {
    const horaLimiteAtendimento = 20;
    const servico = await this.servicoRepository.findOneBy({
      id: diariaRequestDto.servico,
    });

    await this.validatorDiaria.validarDiaria(
      diariaRequestDto,
      horaLimiteAtendimento,
      servico,
    );

    diariaRequestDto.valorComissao = this.calcularComissao(
      diariaRequestDto,
      servico,
    );

    diariaRequestDto.status = DiariaStatus.SEM_PAGAMENTO;

    diariaRequestDto.cliente = usuarioLogado;

    const diariaCadastrada =
      await this.diariaRepository.repository.createDiaria(
        diariaRequestDto,
        servico,
      );

    return this.diariaMapper.toDiariaResponseDto(diariaCadastrada);
  }

  private calcularComissao(
    diariaRequestDto: DiariaRequestDto,
    servico: Servico,
  ): number {
    const preco = diariaRequestDto.preco;
    const porcentagem = servico.porcentagem;
    return (preco * porcentagem) / 100;
  }
}
