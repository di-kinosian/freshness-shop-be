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
    example: '673ddaa8120ddad3e0daca5c',
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
  EXPIRES_IN_ACCESS: '2m',
  EXPIRES_IN_REFRESH: '1d',
};

export const SummaryConstants = {
  USER_REGISTRATION: 'User registration',
  DELETE_PRODUCT_FROM_WISH_LIST: 'Remove product from wish list',
  ADD_PRODUCT_TO_WISH_LIST: 'Add product to wish list',
  GET_USER_WISH_LIST: 'Get user wish list',
  GET_USER_PROFILE: 'Get user profile',
};
