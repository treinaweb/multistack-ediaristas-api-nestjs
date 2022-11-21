import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { Foto } from './entities/foto.entity';

@Injectable()
export class FotosService {
  constructor(
    @InjectRepository(Foto)
    private fotoRepository: Repository<Foto>,
  ) {}

  async salvar(file: Express.Multer.File, req: Request): Promise<Foto> {
    const foto = new Foto();
    foto.fileName = file.filename;
    foto.contentLength = file.size;
    foto.contentType = file.mimetype;
    foto.url = `http://${req.get('host')}/images/${file.filename}`;

    return await this.fotoRepository.save(foto);
  }
}
