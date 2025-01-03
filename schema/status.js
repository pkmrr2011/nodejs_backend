/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
export const statusSchema = {
  type: 'object',
  properties: {
    status: {
      type: 'string',
      enum: ['active', 'inactive', 'expired'],
      errorMessage: {
        type: 'Status must be a string',
        enum: "Status must be one of 'active', 'inactive', or 'expired'",
      },
    },
  },
  required: ['status'],
  additionalProperties: false,
  errorMessage: {
    type: 'Request body must be an object',
    required: {
      status: 'Status is required',
    },
    additionalProperties: 'Additional properties are not allowed',
  },
}
