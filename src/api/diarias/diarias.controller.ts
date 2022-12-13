import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { HateoasDiaria } from 'src/core/hateoas/hateoas-diaria';
import { UsuarioApi } from '../usuarios/entities/usuario.entity';
import TipoUsuario from '../usuarios/enum/tipo-usuario.enum';
import { DiariasService } from './diarias.service';
import { DiariaRequestDto } from './dto/diaria-request.dto';

@Controller('api/diarias')
export class DiariasController {
  constructor(
    private diariasService: DiariasService,
    private hateoas: HateoasDiaria,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(TipoUsuario.CLIENTE)
  async cadastrar(
    @Body() diariaRequestDto: DiariaRequestDto,
    @GetUser() usuarioLogado: UsuarioApi,
  ) {
    const { diariaDto, diaria } = await this.diariasService.cadastrar(
      diariaRequestDto,
      usuarioLogado,
    );

    diariaDto.links = this.hateoas.gerarLinksHateos(
      usuarioLogado.tipoUsuario,
      diaria,
    );

    return diariaDto;
  }
}
