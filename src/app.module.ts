import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlGeneratorModule } from 'nestjs-url-generator';
import { ApiController } from './api/api.controller';
import { CidadesAtendidasModule } from './api/cidades-atendidas/cidades-atendidas.module';
import { EnderecoModule } from './api/consulta-endereco/endereco.module';
import { DiaristasModule } from './api/diaristas/diaristas.module';
import { ServicosModule } from './api/servicos/servicos.module';
import { UsuariosModule } from './api/usuarios/usuarios.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HateosIndex } from './core/hateoas/hateoas-index';
import { TypeOrmConfigService } from './database/typeorm-config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    UsuariosModule,
    CidadesAtendidasModule,
    DiaristasModule,
    EnderecoModule,
    ServicosModule,
    UrlGeneratorModule.forRoot({
      appUrl: 'http://localhost:3000',
    }),
  ],
  controllers: [AppController, ApiController],
  providers: [AppService, HateosIndex],
})
export class AppModule {}
