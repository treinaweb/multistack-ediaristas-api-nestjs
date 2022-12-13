import { Module } from '@nestjs/common';
import { PagamentosService } from './pagamentos.service';
import { PagamentosController } from './pagamentos.controller';
import { DiariaRepository } from '../diarias/diarias.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diaria } from '../diarias/entities/diaria.entity';
import { ValidatorPagamento } from 'src/core/validators/pagamento/validator-pagamento';

@Module({
  imports: [TypeOrmModule.forFeature([Diaria])],
  controllers: [PagamentosController],
  providers: [PagamentosService, DiariaRepository, ValidatorPagamento],
})
export class PagamentosModule {}
