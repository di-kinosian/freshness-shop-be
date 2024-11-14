import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Category } from './shemas/category.shema';
import { SubCategory } from './shemas/subcategory.shema';
import { ErrorMessages } from 'src/main/constants/messages.constants';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(SubCategory.name) private subCategoryModel: Model<SubCategory>,
  ) {}

  async findAllCategories() {
    return this.categoryModel
      .find()
      .populate({
        path: 'subCategories',
        model: 'SubCategory',
        select: 'name parentCategoryId',
      })
      .exec();
  }

  async createCategory(name: string) {
    const category = new this.categoryModel({ name });
    return category.save();
  }

  async createSubCategory(categoryId: string, name: string) {
    try {
      const category = await this.categoryModel.findById(categoryId);

      if (!category) {
        throw new NotFoundException(ErrorMessages.CATEGORY_NOT_FOUND);
      }

      const subCategory = new this.subCategoryModel({
        name,
        parentCategoryId: new Types.ObjectId(categoryId),
      });

      await subCategory.save();
      category.subCategories.push(subCategory._id as Types.ObjectId);
      await category.save();
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException(
          ErrorMessages.FAILED_TO_CREATE_SUBCATEGORY,
        );
      }
    }
  }

  async updateCategory(id: string, name: string) {
    return this.categoryModel.findByIdAndUpdate(id, { name }, { new: true });
  }

  async deleteCategory(id: string): Promise<void> {
    const result = await this.categoryModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(ErrorMessages.CATEGORY_WITH_ID_NOT_FOUND(id));
    }
  }

  async deleteSubCategory(categoryId: string, id: string): Promise<void> {
    const subCategory = await this.subCategoryModel.findByIdAndDelete(id);
    const category = await this.categoryModel.findById(categoryId);

    if (!subCategory) {
      throw new NotFoundException(
        ErrorMessages.SUBCATEGORY_WITH_ID_NOT_FOUND(categoryId),
      );
    }

    if (!category) {
      throw new NotFoundException(
        ErrorMessages.CATEGORY_WITH_ID_NOT_FOUND(categoryId),
      );
    }

    category.subCategories = category.subCategories.filter(
      (subCatId) => !subCatId.equals(new Types.ObjectId(id)),
    );

    await category.save();
  }
}
