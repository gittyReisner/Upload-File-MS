import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import 'reflect-metadata';
import { writeFileSync } from 'fs';
import { urlencoded, json } from 'express';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  var bodyParser = require('body-parser');
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}));
  const config = app.get<ConfigService>(ConfigService);
  const uriPrefix = 'api';
  app.setGlobalPrefix(uriPrefix);

  // swagger definition
  const options = new DocumentBuilder()
    .setTitle('Template')
    .setDescription('template micro-service')
    .setVersion('1.0')
    .addTag('template')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  writeFileSync('./swagger-spec.json', JSON.stringify(document));
  SwaggerModule.setup('docs', app, document);

  app.enableCors();
  await app.init();

  // global configuration definition
  const listenPort = config.get<number>('LISTENING_PORT', 3000);
  Logger.log(`[bootstrap] Running ${process.env.ENV || 'default'} environment configuration`);
  Logger.log(`[bootstrap] Application started, listening to port ${listenPort}`);

  await app.listen(listenPort);
}

bootstrap();
