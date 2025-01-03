/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
export const dateSchema = {
  type: 'object',
  properties: {
    startDate: {
      type: 'string',
      format: 'date',
      errorMessage: {
        type: 'Start date must be a string',
        format: 'Start date must be in the format YYYY-MM-DD',
      },
    },
    endDate: {
      type: 'string',
      format: 'date',
      errorMessage: {
        type: 'End date must be a string',
        format: 'End date must be in the format YYYY-MM-DD',
      },
    },
  },
  additionalProperties: false,
  errorMessage: {
    type: 'Query parameters must be an object',
    additionalProperties: 'Additional query parameters are not allowed',
  },
}
