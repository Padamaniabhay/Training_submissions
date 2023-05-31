import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { TypeORMExceptionFilter } from "./filter/typeorm.filter";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalFilters(new TypeORMExceptionFilter());

  // swagger documentation configuration
  const options = new DocumentBuilder()
    .setTitle("product management")
    .setDescription("Created using nest js")
    .setVersion("1.0")
    .addBearerAuth(
      {
        type: "http",
        description: "enter JWT token",
        bearerFormat: "JWT",
        in: "header",
        name: "JWT",
      },
      "JWT_AUTH",
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);

  await app.listen(3000);
}
bootstrap();
