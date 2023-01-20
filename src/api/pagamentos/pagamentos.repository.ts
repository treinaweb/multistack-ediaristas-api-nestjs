import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Diaria } from '../diarias/entities/diaria.entity';
import { Pagamento } from './entities/pagamento.entity';
import { PagamentoStatus } from './enum/pagamento-status.enum';

export class PagamentoRepository {
  constructor(
    @InjectRepository(Pagamento)
    private pagamentoRepository: Repository<Pagamento>,
  ) {}

  repository = this.pagamentoRepository.extend({
    async findPagamentoParaReembolso(diaria: Diaria): Promise<Pagamento> {
      const pagamento = await this.createQueryBuilder('pagamento')
        .select('pagamento')
        .where('pagamento.diaria_id = :id', { id: diaria.id })
        .andWhere('pagamento.status = :status', {
          status: PagamentoStatus.ACEITO,
        })
        .getOne();

      return pagamento;
    },
  });
}
