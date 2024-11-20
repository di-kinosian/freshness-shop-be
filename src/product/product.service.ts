import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Filter, Product, SelectedFilters } from './product.types';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private productModel: Model<Product>) {}

  async getAllProducts(page: number, limit: number, filters: SelectedFilters) {
    const skip = (page - 1) * limit;

    const query: any = {};

    // if (filters.category) {
    //   query.category = filters.category;
    // }

    if (filters.brands.length) {
      query.brand = { $in: filters.brands };
    }

    if (filters.price.min !== 0 || filters.price.max !== Infinity) {
      query.price = {
        ...(filters.price.min !== 0 && { $gte: filters.price.min }),
        ...(filters.price.max !== Infinity && { $lte: filters.price.max }),
      };
    }

    if (filters.rating.length) {
      query.rating = { $in: filters.rating };
    }

    const [items, total] = await Promise.all([
      this.productModel.find(query).skip(skip).limit(limit).exec(),
      this.productModel.countDocuments(query).exec(),
    ]);

    return { items, total, page };
  }

  async getProductById(id: ProductDto): Promise<Product> {
    return this.productModel
      .findById(id)
      .populate('categoryId')
      .populate('subcategoryId')
      .exec();
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
