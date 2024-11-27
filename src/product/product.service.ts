import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Filter, Product } from './product.types';
import { GetFilteredProductsDto } from './dto/product.filters.dto';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private productModel: Model<Product>) {}

  async getAllProducts(query: GetFilteredProductsDto) {
    const { page, limit, brands, priceMin, priceMax, rating } = query;
    const skip = (page - 1) * limit;

    const dbQuery: any = {
      ...(brands?.length && { brand: { $in: brands } }),
      ...(priceMin !== undefined || priceMax !== undefined
        ? {
            price: {
              ...(priceMin && { $gte: priceMin }),
              ...(priceMax && { $lte: priceMax }),
            },
          }
        : {}),
      ...(rating?.length && { rating: { $in: rating } }),
    };

    const [items, total] = await Promise.all([
      this.productModel.find(dbQuery).skip(skip).limit(limit).exec(),
      this.productModel.countDocuments(dbQuery).exec(),
    ]);

    return { items, total, page };
  }

  async getProductById(id: string): Promise<Product> {
    return this.productModel
      .findById(id)
      .populate('categoryId')
      .populate('subcategoryId')
      .exec();
  }

  async getFilters(): Promise<Filter> {
    console.log('top');

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
    console.log(categories);

    return {
      brands: brands,
      categories: categories,
      price,
    };
  }
}
