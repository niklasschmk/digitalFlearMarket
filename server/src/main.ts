import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import session from "express-session";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
      new ValidationPipe({ transform: true, enableDebugMessages: true }),
  );
  const options = new DocumentBuilder()
      .setTitle('Digital Flear Market')
      .setDescription('Beschreibung')
      .setVersion("1.0")
      .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(8080);
/*
  app.use(
      session({
        secret: 'dfm-secret',
        resave: false,
        saveUninitialized: false,
      }),
  );

 */
  console.log('');
  console.log('-------------------------------------------------------------');
  console.log('                    ToDo-Backend läuft                       ');
  console.log('-------------------------------------------------------------');
  console.log('       Liste abrufen:     http://localhost:8080/             ');
  //console.log('       Frontend aufrufen: http://localhost:4200              ');
  console.log('-------------------------------------------------------------');
}
bootstrap();
