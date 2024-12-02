import { Document } from 'mongoose';

export interface AdditionalInformation {
  key: string;
  value: string | number;
}

export interface Product extends Document {
  _id: string;
  title: string;
  description: string;
  rating?: number;
  price: number;
  quantity: number;
  brand: string;
  country: string;
  images: string[];
  discount?: number;
  categoryId: string;
  subcategoryId: string;
  additionalInformation?: AdditionalInformation[];
}

interface CategoryFilter {
  name: string;
  id: string;
  productCount: number;
}

export interface Filter {
  brands: string[];
  categories: CategoryFilter[];
  price: {
    min: number;
    max: number;
  };
}

export interface SelectedFilters {
  categoryId: string;
  brands: string[];
  price: {
    min: number;
    max: number;
  };
  rating: number[];
}

export interface WishList {
  wishList: string[];
}
