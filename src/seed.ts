import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ProductSeed } from './product/product.seed';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ErrorMessages, Messages } from './main/constants/messages.constants';

async function seed() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const productSeed = app.get(ProductSeed);

  try {
    await productSeed.seed();
    console.log(Messages.SEEDING_COMPLETE);
  } catch (error) {
    console.error(ErrorMessages.SEEDING_FAILED);
  } finally {
    await app.close();
  }
}

seed();
