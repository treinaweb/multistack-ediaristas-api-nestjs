import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Servico } from '../servicos/entities/servico.entity';
import { UsuarioApi } from '../usuarios/entities/usuario.entity';
import { DiariaRequestDto } from './dto/diaria-request.dto';
import { Diaria } from './entities/diaria.entity';

export class DiariaRepository {
  constructor(
    @InjectRepository(Diaria)
    private diariaRepository: Repository<Diaria>,
  ) {}
  repository = this.diariaRepository.extend({
    async createDiaria(diariaRequest: DiariaRequestDto, servico: Servico) {
      const {
        dataAtendimento,
        tempoAtendimento,
        preco,
        logradouro,
        numero,
        bairro,
        complemento,
        cep,
        estado,
        cidade,
        quantidadeBanheiros,
        quantidadeCozinhas,
        quantidadeOutros,
        quantidadeQuartos,
        quantidadeQuintais,
        quantidadeSalas,
        observacoes,
        valorComissao,
        motivoCancelamento,
        cliente,
        codigoIbge,
        status,
      } = diariaRequest;

      const diaria = this.create({
        dataAtendimento,
        tempoAtendimento,
        preco,
        logradouro,
        numero,
        bairro,
        complemento,
        cep,
        estado,
        quantidadeBanheiros,
        quantidadeCozinhas,
        quantidadeOutros,
        quantidadeQuartos,
        quantidadeQuintais,
        quantidadeSalas,
        observacoes,
        valorComissao,
        motivoCancelamento,
        cliente,
        codigoIbge,
        status,
        servico,
        cidade,
      });
      await this.save(diaria);
      return diaria;
    },
    async findByCliente(cliente: UsuarioApi): Promise<Diaria[]> {
      return await this.find({
        where: {
          cliente: {
            id: cliente.id,
          },
        },
      });
    },
    async findByDiarista(diarista: UsuarioApi): Promise<Diaria[]> {
      return await this.find({
        where: {
          diarista: {
            id: diarista.id,
          },
        },
      });
    },
  });
}
