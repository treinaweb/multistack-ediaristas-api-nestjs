import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors({ origin: '*', methods: '*' });
  app.useStaticAssets('public');
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(process.env.PORT);
  console.log(process.env.PORT);
}
bootstrap();
