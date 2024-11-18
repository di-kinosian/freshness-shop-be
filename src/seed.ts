import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ProductSeed } from './product/product.seed';
import { NestExpressApplication } from '@nestjs/platform-express';

async function seed() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const productSeed = app.get(ProductSeed);

  try {
    await productSeed.seed();
  } finally {
    await app.close();
  }
}

seed();
