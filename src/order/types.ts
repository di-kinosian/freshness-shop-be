import { Product } from 'src/product/product.types';

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  CANCELED = 'canceled',
  FAILED = 'failed',
}

export enum PaymentStatus {
  UNPAID = 'unpaid',
  PAID = 'paid',
  REFUNDED = 'refunded',
  FAILED = 'failed',
}

export type BillingData = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  country: string;
  city: string;
  zipCode: string;
  notes?: string;
  agreeToPolicy?: boolean;
  agreeToEmails?: boolean;
};

export type Cart = {
  product: Product;
  quantity: number;
};

export type Order = {
  userId: string;
  status: OrderStatus;
  products: Cart[];
  billingInfo: BillingData;
  paymentStatus: PaymentStatus;
  totalAmount: number;
  checkoutId?: string;
};
