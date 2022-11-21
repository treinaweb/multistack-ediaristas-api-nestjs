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
import { AuthModule } from './auth/auth.module';
import { HateosIndex } from './core/hateoas/hateoas-index';
import { TypeOrmConfigService } from './database/typeorm-config';
import { MeModule } from './api/me/me.module';
import { TokensModule } from './auth/tokens/tokens.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    UsuariosModule,
    CidadesAtendidasModule,
    DiaristasModule,
    EnderecoModule,
    ServicosModule,
    UrlGeneratorModule.forRoot({
      appUrl: 'http://localhost:3000',
    }),
    MeModule,
    TokensModule,
  ],
  controllers: [AppController, ApiController],
  providers: [AppService, HateosIndex],
})
export class AppModule {}
