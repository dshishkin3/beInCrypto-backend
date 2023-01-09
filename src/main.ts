import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";

async function start() {
  const PORT = process.env.PORT || 5000;

  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders: "*",
    origin: "*",
  });

  // swagger
  const config = new DocumentBuilder()
    .setTitle("nest")
    .setDescription("first app with nestjs")
    .setVersion("1.0.0")
    .addTag("beInCrypto")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api/docs", app, document);

  await app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
  });
}
start();
