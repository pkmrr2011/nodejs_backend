/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
export const updateUserSchema = {
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
    first_name: {
      type: 'string',
      minLength: 1,
      maxLength: 50,
      errorMessage: {
        type: 'First name must be a string',
        minLength: 'First name cannot be empty',
        maxLength: 'First name cannot exceed 50 characters',
      },
    },
    last_name: {
      type: 'string',
      maxLength: 50,
      errorMessage: {
        type: 'Last name must be a string',
        maxLength: 'Last name cannot exceed 50 characters',
      },
    },
    gender: {
      type: 'string',
      enum: ['male', 'female', 'other'],
      errorMessage: {
        type: 'Gender must be a string',
        enum: "Gender must be one of 'male', 'female', or 'other'",
      },
    },
    age: {
      type: 'integer',
      minimum: 0,
      maximum: 120,
      errorMessage: {
        type: 'Age must be an integer',
        minimum: 'Age must be at least 0',
        maximum: 'Age cannot exceed 120',
      },
    },
    country: {
      type: 'string',
      minLength: 2,
      maxLength: 3,
      errorMessage: {
        type: 'Country must be a string',
        minLength: 'Country code must have at least 2 characters',
        maxLength: 'Country code must have at most 3 characters',
      },
    },
  },
  additionalProperties: false,
  errorMessage: {
    type: 'Request body must be an object',
    additionalProperties: 'Additional properties are not allowed',
  },
}
