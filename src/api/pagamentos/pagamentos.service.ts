import { Injectable } from '@nestjs/common';
import { ValidatorPagamento } from 'src/core/validators/pagamento/validator-pagamento';
import { DiariaRepository } from '../diarias/diarias.repository';
import DiariaStatus from '../diarias/enum/diaria-status.enum';
import { UsuarioApi } from '../usuarios/entities/usuario.entity';
import { PagamentoRequestDto } from './dto/pagamento-request.dto';

@Injectable()
export class PagamentosService {
  constructor(
    private diariaRepository: DiariaRepository,
    private pagamentoValidator: ValidatorPagamento,
  ) {}
  async pagar(
    pagamentoDto: PagamentoRequestDto,
    id: number,
    usuarioLogado: UsuarioApi,
  ) {
    const diaria = await this.diariaRepository.repository.findOneBy({ id: id });
    this.pagamentoValidator.validarClienteDiaria(usuarioLogado, diaria);
    this.pagamentoValidator.validarStatus(diaria);

    diaria.status = DiariaStatus.PAGO;
    this.diariaRepository.repository.save(diaria);

    return { message: 'Diária Paga Com Sucesso' };
  }
}
