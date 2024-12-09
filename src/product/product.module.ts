import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './shemas/product.shema';
import { ProductSeed } from './product.seed';
import { Category, CategorySchema } from 'src/category/shemas/category.shema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Product', schema: ProductSchema },
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  providers: [ProductService, ProductSeed],
  controllers: [ProductController],
  exports: [ProductSeed]
})

export class ProductModule {}
