import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import 'reflect-metadata'
import * as compression from 'compression';
import { ConfigService } from '@nestjs/config';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger: ['fatal', 'error', 'warn', 'debug','verbose'],
    cors:true
  });
  app.enableCors();
  app.use(compression());
  app.enableVersioning({
    type: VersioningType.HEADER,
    header: 'V1.5',
  });
  const config = new DocumentBuilder()
    .setTitle('ToDoAppAPI')
    .setDescription('An API for a ToDoApp')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); // 'api-docs' is the URL path for your docs

  const configService = app.get(ConfigService);
  const port = configService.get<number>('NESTJS_PORT');
  await app.listen(port ?? 3000);
}
bootstrap();
