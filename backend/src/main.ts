import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { SwaggerDocumentConfig, SwaggerUIOptions } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
  });

  const document = SwaggerModule.createDocument(app, SwaggerDocumentConfig);
  SwaggerModule.setup('api', app, document, SwaggerUIOptions);

  await app.listen(3000);
}
bootstrap();