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
    example: 'john.doe@example.com',
  },
  password: {
    description:
      'User password. Must contain at least 2 lowercase, 2 uppercase, 2 digits, and 2 special characters.',
    example: 'AA12@@bb',
  },
  phoneNumber: {
    description: 'Phone number',
    example: '+1234567893',
  },
};

export const FilteredProductProperties = {
  categoryId: {
    description: 'CategoryId of the product',
    example: 'CategoryId of the product',
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
  EXPIRES_IN_ACCESS: '30m',
  EXPIRES_IN_REFRESH: '7d',
};

export const SummaryConstants = {
  USER_REGISTRATION: 'User registration',
};
