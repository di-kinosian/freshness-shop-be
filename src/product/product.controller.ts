import { Controller, Get, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { DataForPadination } from 'src/main/constants/api.constants';
import { Filter, Product } from './product.types';
import { ProductFiltersDto } from './dto/filters.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts(
    @Query() filters: ProductFiltersDto,
  ): Promise<{ items: Product[]; total: number; page: number }> {
    const parsedFilters = {
      // category: filters.category || '',
      brands: filters.brands || [],
      price: {
        min: filters.priceMin || 0,
        max: filters.priceMax || Infinity,
      },
      rating: filters.rating || [],
    };

    return this.productService.getAllProducts(
      filters.page || 2,
      filters.limit || 10,
      parsedFilters,
    );
  }

  @Get('filters')
  async getFilters(): Promise<Filter> {
    return this.productService.getFilters();
  }
}
