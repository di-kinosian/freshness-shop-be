import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Filter, Product } from './product.types';
import { ErrorMessages } from 'src/main/constants/messages.constants';
import { GetFilteredProductsDto } from './dto/product-filters.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts(@Query() query: GetFilteredProductsDto) {
    return this.productService.getAllProducts(query);
  }

  @Get('filters')
  async getFilters(): Promise<Filter> {
    return this.productService.getFilters();
  }

  @Get(':id')
  async getProduct(@Param('id') id: string): Promise<Product> {
    const product = await this.productService.getProductById(id);

    if (!product) {
      throw new NotFoundException(ErrorMessages.PRODUCT_WITH_ID_NOT_FOUND);
    }

    return product;
  }
}
