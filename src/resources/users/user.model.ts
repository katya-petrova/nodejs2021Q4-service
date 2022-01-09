const userJsonSchema = {
  type: 'object',
  required: ['id'],
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    login: { type: 'string' },
    password: { type: 'string' },
  },
};

const schema = {
  body: userJsonSchema,
};

module.exports = schema;
