import { NestFactory } from '@nestjs/core';
import { RootModule } from './root.module';
let PORT = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(RootModule); // Initializes the server
  await app.listen(PORT); // Starts the server
}
bootstrap();
