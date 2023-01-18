import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { instanceToPlain } from 'class-transformer';
import { Diaria } from 'src/api/diarias/entities/diaria.entity';
import { Pagamento } from 'src/api/pagamentos/entities/pagamento.entity';
import { PagamentoStatus } from 'src/api/pagamentos/enum/pagamento-status.enum';
import { PagamentoRepository } from 'src/api/pagamentos/pagamentos.repository';
import { GatewayPagamentoService } from '../gataway-pagamento.service';
import { PagarmeTransacaoResponseDto } from './dtos/pagarmeTransacaoRequest.dto';
import { PagarmeTransacaoRequestDto } from './dtos/pagarmeTransacaoResponse.dto';

@Injectable()
export class PagarmeService implements GatewayPagamentoService {
  constructor(private pagamentoRepository: PagamentoRepository) {}

  BASE_URL = 'https://api.pagar.me/1';
  API_KEY = 'ak_test_nE14ZiG433nQG0D3aR0XhpzCj4iPkR';

  async pagar(diaria: Diaria, cardHash: string): Promise<Pagamento> {
    try {
      return await this.tryPagar(diaria, cardHash);
    } catch (error) {
      throw new BadRequestException(error.response.data.errors);
    }
  }

  realizarEstornoTotal(diaria: Diaria): Promise<Pagamento> {
    throw new Error('Method not implemented.');
  }
  realizarEstornoParcial(diaria: Diaria): Promise<Pagamento> {
    throw new Error('Method not implemented.');
  }

  private async tryPagar(diaria: Diaria, cardHash: string) {
    const transacaoRequest = this.criarTransacaoRequest(diaria, cardHash);
    const url = `${this.BASE_URL}/transactions`;
    const response = await axios.post(url, instanceToPlain(transacaoRequest));
    return this.criarPagamento(diaria, response.data);
  }

  private async criarPagamento(
    diaria: Diaria,
    body: PagarmeTransacaoResponseDto,
  ) {
    const pagamento = new Pagamento();
    pagamento.valor = diaria.preco;
    pagamento.transacaoId = body.id;
    pagamento.status = this.criarPagamentoStatus(body.status);
    pagamento.diaria = diaria;
    return await this.pagamentoRepository.repository.save(pagamento);
  }
  private criarPagamentoStatus(status: string): number {
    return status === 'paid'
      ? PagamentoStatus.ACEITO
      : PagamentoStatus.REPROVADO;
  }

  private criarTransacaoRequest(diaria: Diaria, cardHash: string) {
    const transacaoRequest = new PagarmeTransacaoRequestDto();
    transacaoRequest.amount = diaria.preco * 100;
    transacaoRequest.cardHash = cardHash;
    transacaoRequest.async = false;
    transacaoRequest.apiKey = this.API_KEY;
    return transacaoRequest;
  }
}
