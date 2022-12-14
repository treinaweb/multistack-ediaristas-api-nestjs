import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HateoasDiaria } from 'src/core/hateoas/hateoas-diaria';
import { ValidatorDiaria } from 'src/core/validators/diaria/validator-diaria';
import { ValidatorDiariaUsuario } from 'src/core/validators/diaria/validator-diaria-usuario';
import { Repository } from 'typeorm';
import { Servico } from '../servicos/entities/servico.entity';
import { UsuarioApi } from '../usuarios/entities/usuario.entity';
import TipoUsuario from '../usuarios/enum/tipo-usuario.enum';
import { DiariaMapper } from './diarias.mapper';
import { DiariaRepository } from './diarias.repository';
import { DiariaRequestDto } from './dto/diaria-request.dto';
import { DiariaResponseDto } from './dto/diaria-response.dto';
import { Diaria } from './entities/diaria.entity';
import DiariaStatus from './enum/diaria-status.enum';

@Injectable()
export class DiariasService {
  constructor(
    @InjectRepository(Servico)
    private servicoRepository: Repository<Servico>,
    private diariaRepository: DiariaRepository,
    private diariaMapper: DiariaMapper,
    private validatorDiaria: ValidatorDiaria,
    private hateOas: HateoasDiaria,
    private validatorUsuario: ValidatorDiariaUsuario,
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

    const diariaDto = this.diariaMapper.toDiariaResponseDto(diariaCadastrada);

    return { diariaDto: diariaDto, diaria: diariaCadastrada };
  }

  async listarPorUsuarioLogado(usuarioLogado: UsuarioApi) {
    if (usuarioLogado.tipoUsuario === TipoUsuario.CLIENTE) {
      const diarias = await this.diariaRepository.repository.findByCliente(
        usuarioLogado,
      );
      return Promise.all(
        diarias.map((diaria) => {
          const diariaDto = this.diariaMapper.toDiariaResponseDto(diaria);
          diariaDto.links = this.hateOas.gerarLinksHateos(
            usuarioLogado.tipoUsuario,
            diaria,
          );
          return diariaDto;
        }),
      );
    } else {
      const diarias = await this.diariaRepository.repository.findByDiarista(
        usuarioLogado,
      );
      return Promise.all(
        diarias.map((diaria) => {
          const diariaDto = this.diariaMapper.toDiariaResponseDto(diaria);
          diariaDto.links = this.hateOas.gerarLinksHateos(
            usuarioLogado.tipoUsuario,
            diaria,
          );
          return diariaDto;
        }),
      );
    }
  }

  async buscarPorId(
    id: number,
    usuarioLogado: UsuarioApi,
  ): Promise<{ diariaDto: DiariaResponseDto; diaria: Diaria }> {
    const diaria = await this.diariaRepository.repository.findOneBy({ id: id });
    if (!diaria) {
      throw new BadRequestException(`Diária de ID:${id} não encontrada`);
    }

    const diariaDto = await this.diariaMapper.toDiariaResponseDto(diaria);
    this.validatorUsuario.validarDiariaUsuario(usuarioLogado, diaria);
    return { diariaDto: diariaDto, diaria: diaria };
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
