import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateSubCategoryDto } from './dto/create-subcategory.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Messages } from 'src/main/constants/messages.constants';
import { ApiBody, ApiParam } from '@nestjs/swagger';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAllCategories() {
    return this.categoryService.findAllCategories();
  }

  @Post()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    const createdCategory = await this.categoryService.createCategory(
      createCategoryDto.name,
    );

    return createdCategory;
  }

  @Put(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const updatedCategory = await this.categoryService.updateCategory(
      id,
      updateCategoryDto.name,
    );

    return updatedCategory;
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string) {
    await this.categoryService.deleteCategory(id);

    return { message: Messages.CATEGORY_DELETED_SUCCESSFULLY };
  }

  @Post(':id/subcategory')
  @ApiParam({ name: 'id', description: 'ID of the parent category' })
  @ApiBody({ type: CreateSubCategoryDto })
  async createSubCategory(
    @Param('id') categoryId: string,
    @Body() createSubCategoryDto: CreateSubCategoryDto,
  ) {
    const { name } = createSubCategoryDto;

    return this.categoryService.createSubCategory(categoryId, name);
  }

  @Delete(':id/subcategory/:subCategoryId')
  async deleteSubCategory(
    @Param('id') id: string,
    @Param('subCategoryId') subCategoryId: string,
  ) {
    try {
      await this.categoryService.deleteSubCategory(id, subCategoryId);

      return { message: Messages.SUBCATEGORY_DELETED_SUCCESS };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
