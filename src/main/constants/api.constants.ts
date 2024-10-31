export const apiProperties = {
  firstName: {
    description: 'User first name',
    example: 'John',
  },
  lastName: {
    description: 'User last name',
    example: 'Doe',
  },
  email: {
    description: 'User email address',
    example: 'john.doe@example.com',
  },
  password: {
    description:
      'User password. Must contain at least 2 lowercase, 2 uppercase, 2 digits, and 2 special characters.',
    example: 'AA12@@bb',
  },
  phoneNumber: {
    description: 'User phone number',
    example: '+1234567893',
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

export const Messages = {
  HELLO_WORLD: 'Hello World!',
  EMAIL_ALREADY_IN_USE: 'Email already in use',
};
