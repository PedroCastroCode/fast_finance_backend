import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.set('query parser', 'extended');
  const config = new DocumentBuilder()
    .setTitle('Clean Architecture')
    .setDescription('Em desenvolvimento')
    .setVersion('1.0')
    .build();
  app.enableCors();
  const customOptions: ExpressSwaggerCustomOptions = {
    customSiteTitle: 'Clean Architecture',
    customCss: `
      .swagger-ui section.models{display: none};`,
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  };

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, customOptions);
  await app.listen(3333);
}

bootstrap();

interface ExpressSwaggerCustomOptions {
  explorer?: boolean;
  swaggerOptions?: Record<string, any>;
  customCss?: string;
  customCssUrl?: string;
  customJs?: string;
  customfavIcon?: string;
  swaggerUrl?: string;
  customSiteTitle?: string;
  operationsSorter?: string;
  url?: string;
  urls?: Record<'url' | 'name', string>[];
}
