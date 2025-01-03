/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
export const loginSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email',
      maxLength: 255,
      errorMessage: {
        type: 'Email must be a string',
        format: 'Email must be a valid email address',
        maxLength: 'Email cannot exceed 255 characters',
      },
    },
    password: {
      type: 'string',
      minLength: 5,
      maxLength: 100,
      errorMessage: {
        type: 'Password must be a string',
        minLength: 'Password must be at least 5 characters long',
        maxLength: 'Password cannot exceed 100 characters',
      },
    },
  },
  required: ['email', 'password'],
  additionalProperties: false,
  errorMessage: {
    type: 'Request body must be an object',
    required: {
      email: 'Email is required',
      password: 'Password is required',
    },
    additionalProperties: 'Additional properties are not allowed',
  },
}
