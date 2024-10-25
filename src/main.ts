import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

const PORT = 3000;
const HOST = '127.0.0.1';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await app.listen(PORT, HOST, () => {
    console.log(`Server started on port ${PORT}`);
  });
}
bootstrap();
