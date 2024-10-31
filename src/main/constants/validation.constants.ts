export const firstNameValidation = {
  message: 'First name is required',
};

export const lastNameValidation = {
  message: 'Last name is required',
};

export const emailValidation = {
  message: 'Email must be a valid email address',
};

export const passwordValidation = {
  minLength: 8,
  regex: /(?=.*[a-z]{2,})(?=.*[A-Z]{2,})(?=.*\d{2,})(?=.*[@$!%*?&]{2,})/,
};

export const phoneNumberValidation = {
  optional: true,
  regex: /^\+(\d{1,3})\d{9,14}$/,
};
