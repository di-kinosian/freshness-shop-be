import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, SortOrder } from 'mongoose';
import { Filter, Product } from './product.types';
import { GetFilteredProductsDto } from './dto/product-filters.dto';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private productModel: Model<Product>) {}

  async getAllProducts(query: GetFilteredProductsDto) {
    const {
      categoryId,
      page = 1,
      limit = 10,
      brands,
      priceMin,
      priceMax,
      rating,
      sortField,
      sortDirection,
      searchValue,
    } = query;
    const skip = (page - 1) * limit;

    const dbQuery: any = {
      ...(categoryId ? { categoryId } : {}),
      ...(brands?.length ? { brand: { $in: brands } } : {}),
      ...(priceMin !== undefined || priceMax !== undefined
        ? {
            price: {
              ...(Boolean(priceMin) ? { $gte: priceMin } : {}),
              ...(Boolean(priceMax) ? { $lte: priceMax } : {}),
            },
          }
        : {}),
      ...(rating?.length ? { rating: { $in: rating } } : {}),
      ...(searchValue ? { title: { $regex: searchValue, $options: 'i' } } : {}),
    };

    const sort: { [key: string]: SortOrder } = {};

    if (sortField && sortDirection) {
      sort[sortField] = sortDirection === 'asc' ? 1 : -1;
    }

    const [items, total] = await Promise.all([
      this.productModel.find(dbQuery).sort(sort).skip(skip).limit(limit).exec(),
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
