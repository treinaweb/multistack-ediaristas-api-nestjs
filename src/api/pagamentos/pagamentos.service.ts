import { Injectable } from '@nestjs/common';
import { GatewayPagamentoService } from 'src/core/services/gataway-pagamento/gataway-pagamento.service';
import { ValidatorPagamento } from 'src/core/validators/pagamento/validator-pagamento';
import { DiariaRepository } from '../diarias/diarias.repository';
import DiariaStatus from '../diarias/enum/diaria-status.enum';
import { UsuarioApi } from '../usuarios/entities/usuario.entity';
import { PagamentoRequestDto } from './dto/pagamento-request.dto';
import { PagamentoStatus } from './enum/pagamento-status.enum';

@Injectable()
export class PagamentosService {
  constructor(
    private diariaRepository: DiariaRepository,
    private pagamentoValidator: ValidatorPagamento,
    private gataway: GatewayPagamentoService,
  ) {}
  async pagar(
    pagamentoDto: PagamentoRequestDto,
    id: number,
    usuarioLogado: UsuarioApi,
  ) {
    const diaria = await this.diariaRepository.repository.findOneBy({ id: id });
    this.pagamentoValidator.validarClienteDiaria(usuarioLogado, diaria);
    this.pagamentoValidator.validarStatus(diaria);

    const pagamento = await this.gataway.pagar(diaria, pagamentoDto.cardHash);

    if (pagamento.status === PagamentoStatus.ACEITO) {
      diaria.status = DiariaStatus.PAGO;
      this.diariaRepository.repository.save(diaria);
      return { message: 'Diária paga com sucesso' };
    }

    return { message: 'Pagamento Recusado' };
  }
}
