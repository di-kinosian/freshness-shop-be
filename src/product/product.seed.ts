import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './dto/product.dto';

@Injectable()
export class ProductSeed {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async seed() {
    const sampleProducts = [
      {
        title: 'Smartphone',
        description: 'A high-quality smartphone with advanced features.',
        rating: 4.5,
        price: 799,
        quantity: 50,
        brand: 'TechBrand',
        country: 'USA',
        images: ['image1.jpg', 'image2.jpg'],
        discount: 10,
        categoryId: '634f1ad02860e54333b9b0a1',
        subcategoryId: '634f1ad02860e54333b9b0a2',
        additionalInformation: [
          { key: 'color', value: 'black' },
          { key: 'storage', value: '128GB' },
        ],
      },
      {
        title: 'Laptop',
        description: 'A powerful laptop with high performance.',
        price: 1200,
        quantity: 30,
        brand: 'LaptopBrand',
        country: 'Germany',
        images: ['laptop1.jpg', 'laptop2.jpg'],
        categoryId: '634f1ad02860e54333b9b0a3',
        subcategoryId: '634f1ad02860e54333b9b0a4',
        additionalInformation: [
          { key: 'processor', value: 'Intel i7' },
          { key: 'ram', value: '16GB' },
        ],
      },
    ];

    await this.productModel.insertMany(sampleProducts);
    console.log('Sample products have been added to the database.');
  }
}
