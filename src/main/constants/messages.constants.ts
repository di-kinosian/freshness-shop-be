export const validationMessages = {
  passwordComplexity:
    'Password must contain at least 2 lowercase, 2 uppercase, 2 digits, and 2 special characters',
  phoneNumberFormat:
    'Phone number must start with "+" followed by the country code and have a valid national number (e.g., +380123456789 or +33123456789)',
  withListItemFormat: 'Each item in wishList must be a valid MongoDB ID',
};

export const Messages = {
  HELLO_WORLD: 'Hello World!',
  USERMODULE_INITIALIZED: 'UserModule initialized',
  SHOULD_RETURN_HELLO_WORLD: 'should return "Hello World!',
  TOKEN_IS_EXPIRED: 'Token is expired',
  LOGOUT_SUCCESSFULLY: 'Logged out successfully',
  DELETED_SUCCESSFULLY: (item: string) => `${item} was deleted successfuly`,
};

export const ErrorMessages = {
  INVALID_EMAIL: 'Invalid email or password',
  INVALID_PRODUCT_ID_FORMAT: 'Invalid product ID format',
  EMAIL_ALREADY_IN_USE: 'Email already in use',
  USER_EMAIL_NOT_FOUND: 'User with email {email} not found',
  USER_ID_NOT_FOUND: 'User with ID {userId} not found',
  USER_NOT_FOUND: 'User not found',
  REFRESH_TOKEN_IS_NOT_PROVIDED: 'Refresh token is not provided',
  REFRESH_TOKEN_IS_INVALID: 'Invalid refresh token',
  CATEGORY_NOT_FOUND: 'Category is not found',
  FAILED_TO_CREATE_SUBCATEGORY: 'Failed to create subcategory',
  CATEGORY_WITH_ID_NOT_FOUND: (id: string) =>
    `Category with ${id} id not defined`,
  SUBCATEGORY_WITH_ID_NOT_FOUND: (id: string) =>
    `Subcategory with id ${id} not found`,
  PRODUCT_WITH_ID_NOT_FOUND: (id: string) => `Product with ID ${id} not found`,
};
