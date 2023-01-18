import { Module } from '@nestjs/common';
import { PagamentosService } from './pagamentos.service';
import { PagamentosController } from './pagamentos.controller';
import { DiariaRepository } from '../diarias/diarias.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diaria } from '../diarias/entities/diaria.entity';
import { ValidatorPagamento } from 'src/core/validators/pagamento/validator-pagamento';
import { Pagamento } from './entities/pagamento.entity';
import { PagamentoRepository } from './pagamentos.repository';
import { GatewayPagamentoService } from 'src/core/services/gataway-pagamento/gataway-pagamento.service';
import { PagarmeService } from 'src/core/services/gataway-pagamento/providers/pagarme.service';

@Module({
  imports: [TypeOrmModule.forFeature([Diaria, Pagamento])],
  controllers: [PagamentosController],
  providers: [
    PagamentosService,
    DiariaRepository,
    ValidatorPagamento,
    PagamentoRepository,
    {
      provide: GatewayPagamentoService,
      useClass: PagarmeService,
    },
  ],
})
export class PagamentosModule {}
