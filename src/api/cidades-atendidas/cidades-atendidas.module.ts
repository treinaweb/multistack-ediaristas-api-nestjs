import { Module } from '@nestjs/common';
import { CidadesAtendidasService } from './cidades-atendidas.service';
import { CidadesAtendidasController } from './cidades-atendidas.controller';

@Module({
  controllers: [CidadesAtendidasController],
  providers: [CidadesAtendidasService]
})
export class CidadesAtendidasModule {}
