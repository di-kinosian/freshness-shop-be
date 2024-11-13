import { Controller, Get, Query } from '@nestjs/common';
import { Product } from './dto/product.dto';
import { ProductService } from './product.service';
import { DateForPadination } from 'src/main/constants/api.constants';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts(
    @Query('page') page: number = DateForPadination.page,
    @Query('limit') limit: number = DateForPadination.limit,
  ): Promise<{ items: Product[]; total: number; page: number }> {
    return this.productService.getAllProducts(page, limit);
  }
}
