import { ProductSchema } from 'src/product/shemas/product.shema';

export const UserProperties = {
  firstName: {
    description: 'First name',
    example: 'John',
  },
  lastName: {
    description: 'Last name',
    example: 'Doe',
  },
  email: {
    description: 'User email',
    example: 'diana.doe@example.com',
  },
  password: {
    description:
      'User password. Must contain at least 2 lowercase, 2 uppercase, 2 digits, and 2 special characters.',
    example: 'PP12@@bb',
  },
  phoneNumber: {
    description: 'Phone number',
    example: '+1234567893',
  },
  wishList: {
    description: 'Wish list (array with productIds)',
    example: ['673ddaa8120ddad3e0daca5c'],
  },
};

export const FilteredProductProperties = {
  categoryId: {
    description: 'CategoryId of the product',
    example: '67362e66cd487232b2f86e4a',
  },
  brands: {
    description: 'List of brands',
    example: '["Sony", "Samsung"]',
  },
  priceMin: {
    description: 'Minimum price for the product',
    example: 20,
  },
  priceMax: {
    description: 'Maximum price for the product',
    example: 1200,
  },
  rating: {
    description: 'List of ratings',
    example: [4, 5],
  },
  page: {
    description: 'Page number for pagination',
    example: 1,
  },
  limit: {
    description: 'Number of items per page',
    example: 5,
  },
  sortField: {
    description: 'Field to sort by ',
    example: 'rating',
  },
  sortDirection: {
    description: 'Sort direction',
    example: 'asc',
  },
  searchValue: {
    description: 'Value in search',
    example: 'iPhone',
  },
};

export const CartItemProperties = {
  productId: {
    description: 'Product ID to be added to the cart',
    example: '675302c1823af6cae010ea90',
  },
  quantity: {
    description: 'Quantity of the product',
    example: 2,
  },
};

export const CartProperties = {
  userId: {
    description: 'Unique identifier for the user',
    example: 'user123',
  },
  items: {
    description: 'List of items in the cart',
    example: [
      { quantity: 2, productId: 'product123' },
      { quantity: 1, productId: 'product456' },
    ],
  },
};

export const CreateOrderProperties = {
  userId: {
    description: 'User ID placing the order',
    example: '6720f8f3f948281007e15644',
  },
  status: {
    description: 'Status of the order',
  },
  billingInfo: {
    description: 'Billing information of the order',
  },
  paymentStatus: {
    description: 'Payment status of the order',
  },
  totalAmount: {
    description: 'Total amount for the order',
  },
};

export const BillingProperties = {
  address: {
    description: 'Address of the customer',
    example: '123 Main St',
  },
  country: { description: 'Country of the customer', example: 'USA' },
  city: { description: 'City of the customer', example: 'New York' },
  zipCode: { description: 'Zip code of the customer', example: '10001' },
  notes: {
    description: 'Optional notes for the order',
    example: 'Leave at the front door',
    required: false,
  },
  agreeToPolicy: {
    description: 'Agreement to policy',
    example: true,
    required: false,
  },
  agreeToEmails: {
    description: 'Agreement to receive emails',
    example: false,
    required: false,
  },
};

export const ProductProperties = {
  _id: { description: 'Product ID', example: '609e1234567890abcdef1234' },
  title: {
    description: 'Title of the product',
    example: 'Wireless Mouse',
  },
  description: {
    description: 'Description of the product',
    example: 'A high-quality wireless mouse',
  },
  rating: {
    description: 'Rating of the product',
    example: 4.5,
    required: false,
  },
  price: { description: 'Price of the product', example: 29.99 },
  quantity: { description: 'Quantity available in stock', example: 100 },
  brand: { description: 'Brand of the product', example: 'Logitech' },

  country: { description: 'Country of origin', example: 'USA' },
  images: {
    description: 'Images of the product',
    example: ['image1.jpg', 'image2.jpg'],
  },
  discount: {
    description: 'Discount on the product',
    example: 10,
    required: false,
  },
  categoryId: {
    description: 'Category ID of the product',
    example: 'category123',
  },
  subcategoryId: {
    description: 'Subcategory ID of the product',
    example: 'subcategory123',
  },
  additionalInformation: {
    description: 'Additional information',
    example: [{ country: 'Ukraine' }],
  },
};

export const OrderProductProperties = {
  product: { description: 'Product details' },
  quantity: {
    description: 'Quantity of the product',
    example: 2,
    minimum: 1,
  },
};

export const CreateCheckoutSessionProperties = {
  products: {
    description: 'Array of items to be purchased',
    example: [{ product: ProductSchema, quantity: 1 }],
  },
};

export const DataForPadination = {
  page: 1,
  limit: 5,
};

export const RefreshTokenProperties = {
  refreshToken: {
    description: 'Refresh token',
    example: 'your_refresh_token',
  },
};

export const ApiDescriptions = {
  GET_HELLO: 'Retrieve a greeting message from the server.',
};

export const ApiResponses = {
  success200: {
    status: 200,
    description: ApiDescriptions.GET_HELLO,
  },
};

export const JwtConstants = {
  EXPIRES_IN_ACCESS: '10m',
  EXPIRES_IN_REFRESH: '1d',
};

export const SummaryConstants = {
  USER_REGISTRATION: 'User registration',
  DELETE_PRODUCT_FROM_WISH_LIST: 'Remove product from wish list',
  ADD_PRODUCT_TO_WISH_LIST: 'Add product to wish list',
  GET_USER_WISH_LIST: 'Get user wish list',
  GET_CART: 'Get cart',
  UPDATE_PRODUCT: 'Update product',
  GET_USER_PROFILE: 'Get user profile',
  DELETE_PRODUCT_FROM_CART: 'Remove product from cart',
  ADD_PRODUCT_TO_CART: 'Add product to cart',
  ADD_ORDER: 'Add order',
  ORDER_CONFIRM: 'Order confirm',
};
