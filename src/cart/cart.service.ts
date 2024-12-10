import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart } from './shemas/cart.shema';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { Product } from 'src/product/product.types';
import { ErrorMessages } from 'src/main/constants/messages.constants';
import { DeleteFromCartDto } from './dto/delete-from-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<Cart>,
    @InjectModel('Product') private productModel: Model<Product>,
  ) {}

  async getCart(
    userId: string,
  ): Promise<{ product: Product; quantity: number }[]> {
    const cart = await this.cartModel.findOne({ userId });

    if (!cart) {
      throw new NotFoundException(ErrorMessages.CART_NOT_FOUND);
    }

    const productsWithQuantities = await Promise.all(
      cart.items.map(async (item) => {
        const product = await this.productModel.findById(item.productId);

        if (!product) {
          throw new NotFoundException(
            ErrorMessages.PRODUCT_WITH_ID_NOT_FOUND(item.productId),
          );
        }

        return { product, quantity: item.quantity };
      }),
    );

    return productsWithQuantities;
  }

  async addToCart(userId: string, addToCartDto: AddToCartDto): Promise<Cart> {
    const { productId, quantity } = addToCartDto;
    let cart = await this.cartModel.findOne({ userId });

    if (!cart) {
      cart = new this.cartModel({
        userId,
        items: [],
      });
    }

    const existingItem = cart.items.find(
      (item) => item.productId === productId,
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    return cart.save();
  }

  async deleteFromCart(
    userId: string,
    DeleteFromCartDto: DeleteFromCartDto,
  ): Promise<Cart> {
    const { productId } = DeleteFromCartDto;
    let cart = await this.cartModel.findOne({ userId });

    if (!cart) {
      throw new NotFoundException(ErrorMessages.CART_NOT_FOUND);
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId === productId,
    );

    if (itemIndex === -1) {
      throw new NotFoundException(ErrorMessages.PRODUCT_NOT_FOUND_IN_CART);
    }

    cart.items.splice(itemIndex, 1);

    return cart.save();
  }
}
