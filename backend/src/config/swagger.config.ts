import { DocumentBuilder } from '@nestjs/swagger';
import type { SwaggerCustomOptions as NestSwaggerCustomOptions } from '@nestjs/swagger';
import { BEARER_AUTH_NAME } from './constans';

// Configuration constants
export const SWAGGER_CONFIG = {
  title: 'E-Commerce API',
  description: 'The e-commerce API documentation',
  version: '1.0',
  bearerAuthName: BEARER_AUTH_NAME
};

// Document builder configuration
export const SwaggerDocumentConfig = new DocumentBuilder()
  .setTitle(SWAGGER_CONFIG.title)
  .setDescription(SWAGGER_CONFIG.description)
  .setVersion(SWAGGER_CONFIG.version)
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    },
    SWAGGER_CONFIG.bearerAuthName,
  )
  .build();

// Custom Swagger UI options
export const SwaggerUIOptions: NestSwaggerCustomOptions = {
  swaggerOptions: {
    persistAuthorization: true,
    docExpansion: 'none',
    operationsSorter: 'method',
    tagsSorter: 'alpha',
    defaultModelRendering: 'model',
    validatorUrl: null,
  },
  customSiteTitle: SWAGGER_CONFIG.title,
};