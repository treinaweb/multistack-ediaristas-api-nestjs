import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsuarioRequestDto } from './dto/usuario-request.dto';
import multerConfig from './multer-config';
import { UsuariosService } from './usuarios.service';
import { Request } from 'express';
import { HateoasUsuario } from 'src/core/hateoas/hateoas-usuario';

@Controller('api/usuarios')
export class UsuariosController {
  constructor(
    private readonly usuariosService: UsuariosService,
    private hateOas: HateoasUsuario,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('foto_documento', multerConfig))
  async cadastrar(
    @Body() usuarioRequestDto: UsuarioRequestDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    const usuarioCadastrado = await this.usuariosService.cadastrar(
      usuarioRequestDto,
      file,
      req,
    );

    usuarioCadastrado.links = this.hateOas.gerarLinksHateos(
      usuarioRequestDto.tipoUsuario,
    );

    return usuarioCadastrado;
  }
}
