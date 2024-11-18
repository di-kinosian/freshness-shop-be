import { Controller, Get, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { DataForPadination } from 'src/main/constants/api.constants';
import { Filter, Product } from './product.types';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts(
    @Query('page') page: number = DataForPadination.page,
    @Query('limit') limit: number = DataForPadination.limit,
  ): Promise<{ items: Product[]; total: number; page: number }> {
    return this.productService.getAllProducts(page, limit);
  }

  @Get('filters')
  async getFilters(): Promise<Filter> {
    return this.productService.getFilters();
  }
}
