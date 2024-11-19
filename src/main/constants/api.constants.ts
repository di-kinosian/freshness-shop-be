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
