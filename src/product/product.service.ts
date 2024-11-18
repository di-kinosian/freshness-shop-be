import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/category/shemas/category.shema';
import { Filter, Product } from './product.types';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private productModel: Model<Product>) {}

  async getAllProducts(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.productModel.find().skip(skip).limit(limit).exec(),
      this.productModel.countDocuments().exec(),
    ]);

    return { items, total, page };
  }

  async getFilters(): Promise<Filter> {
    const brands = await this.productModel.distinct('brand').exec();
    const [price] = await this.productModel.aggregate([
      {
        $group: {
          min: { $min: '$price' },
          max: { $max: '$price' },
          _id: null,
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);

    const categories = await this.productModel.aggregate([
      {
        $group: {
          _id: '$categoryId',
          productCount: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: 'categories',
          localField: '_id',
          foreignField: '_id',
          as: 'category',
        },
      },
      {
        $unwind: '$category',
      },
      {
        $project: {
          _id: 0,
          id: '$_id',
          name: '$category.name',
          productCount: 1,
        },
      },
    ]);

    return {
      brands: brands,
      categories: categories,
      price,
    };
  }
}
