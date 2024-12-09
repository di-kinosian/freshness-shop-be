import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.types';
import { data } from './seedData';

@Injectable()
export class ProductSeed {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async seed() {
    const sampleProducts = data

    await this.productModel.insertMany(sampleProducts);
  }
}
