const swaggerDocument = {
  openapi: '3.0.3',
  info: {
    title: 'Pizza Builder API',
    version: '1.0.0',
    description: 'Simple in-memory API for pizzas, sizes, and ingredients'
  },
  servers: [{ url: 'http://localhost:3000', description: 'Local' }],
  tags: [
    { name: 'Pizzas' },
    { name: 'Sizes' },
    { name: 'Ingredients' },
    { name: 'Health' }
  ],
  paths: {
    '/health': {
      get: {
        tags: ['Health'],
        summary: 'Health check',
        responses: {
          200: {
            description: 'API healthy',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { status: { type: 'string', example: 'ok' } }
                }
              }
            }
          },
          503: {
            description: 'API unhealthy',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { status: { type: 'string', example: 'unavailable' } }
                }
              }
            }
          }
        }
      }
    },
    '/pizzas': {
      get: {
        tags: ['Pizzas'],
        summary: 'List pizzas',
        parameters: [
          {
            in: 'query',
            name: 'customerName',
            schema: { type: 'string' },
            description: 'Filter by customer name substring'
          },
          {
            in: 'query',
            name: 'sortBy',
            schema: { type: 'string', enum: ['finalPrice', 'createdAt'] },
            description: 'Sort column'
          },
          {
            in: 'query',
            name: 'order',
            schema: { type: 'string', enum: ['asc', 'desc'] },
            description: 'Sort direction'
          }
        ],
        responses: {
          200: {
            description: 'Pizzas found',
            content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Pizza' } } } }
          }
        }
      },
      post: {
        tags: ['Pizzas'],
        summary: 'Create pizza',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/PizzaCreate' }
            }
          }
        },
        responses: {
          201: { description: 'Created', content: { 'application/json': { schema: { $ref: '#/components/schemas/Pizza' } } } },
          400: { description: 'Invalid size or ingredient id' }
        }
      }
    },
    '/pizzas/{id}': {
      get: {
        tags: ['Pizzas'],
        summary: 'Get pizza by id',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Found', content: { 'application/json': { schema: { $ref: '#/components/schemas/Pizza' } } } },
          404: { description: 'Not found' }
        }
      },
      put: {
        tags: ['Pizzas'],
        summary: 'Update pizza',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/PizzaUpdate' }
            }
          }
        },
        responses: {
          200: { description: 'Updated', content: { 'application/json': { schema: { $ref: '#/components/schemas/Pizza' } } } },
          400: { description: 'Invalid size or ingredient id' },
          404: { description: 'Not found' }
        }
      },
      delete: {
        tags: ['Pizzas'],
        summary: 'Delete pizza',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        responses: {
          204: { description: 'Deleted' },
          404: { description: 'Not found' }
        }
      }
    },
    '/sizes': {
      get: {
        tags: ['Sizes'],
        summary: 'List sizes',
        responses: {
          200: {
            description: 'Sizes found',
            content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Size' } } } }
          }
        }
      },
      post: {
        tags: ['Sizes'],
        summary: 'Create size',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Size' }
            }
          }
        },
        responses: {
          201: { description: 'Created', content: { 'application/json': { schema: { $ref: '#/components/schemas/Size' } } } }
        }
      }
    },
    '/sizes/{id}': {
      get: {
        tags: ['Sizes'],
        summary: 'Get size',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Found', content: { 'application/json': { schema: { $ref: '#/components/schemas/Size' } } } },
          404: { description: 'Not found' }
        }
      },
      put: {
        tags: ['Sizes'],
        summary: 'Update size',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/SizeUpdate' }
            }
          }
        },
        responses: {
          200: { description: 'Updated', content: { 'application/json': { schema: { $ref: '#/components/schemas/Size' } } } },
          404: { description: 'Not found' }
        }
      },
      delete: {
        tags: ['Sizes'],
        summary: 'Delete size',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        responses: {
          204: { description: 'Deleted' },
          404: { description: 'Not found' }
        }
      }
    },
    '/ingredients': {
      get: {
        tags: ['Ingredients'],
        summary: 'List ingredients',
        responses: {
          200: {
            description: 'Ingredients found',
            content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Ingredient' } } } }
          }
        }
      },
      post: {
        tags: ['Ingredients'],
        summary: 'Create ingredient',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Ingredient' }
            }
          }
        },
        responses: {
          201: { description: 'Created', content: { 'application/json': { schema: { $ref: '#/components/schemas/Ingredient' } } } }
        }
      }
    },
    '/ingredients/{id}': {
      get: {
        tags: ['Ingredients'],
        summary: 'Get ingredient',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Found', content: { 'application/json': { schema: { $ref: '#/components/schemas/Ingredient' } } } },
          404: { description: 'Not found' }
        }
      },
      put: {
        tags: ['Ingredients'],
        summary: 'Update ingredient',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/IngredientUpdate' }
            }
          }
        },
        responses: {
          200: { description: 'Updated', content: { 'application/json': { schema: { $ref: '#/components/schemas/Ingredient' } } } },
          404: { description: 'Not found' }
        }
      },
      delete: {
        tags: ['Ingredients'],
        summary: 'Delete ingredient',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        responses: {
          204: { description: 'Deleted' },
          404: { description: 'Not found' }
        }
      }
    }
  },
  components: {
    schemas: {
      Pizza: {
        type: 'object',
        properties: {
          id: { type: 'string', example: '1' },
          customerName: { type: 'string', example: 'Ada Lovelace' },
          sizeId: { type: 'string', example: 'm' },
          ingredientIds: { type: 'array', items: { type: 'string' }, example: ['cheese', 'pepperoni'] },
          createdAt: { type: 'string', format: 'date-time' },
          finalPrice: { type: 'number', example: 27.5 }
        }
      },
      PizzaCreate: {
        type: 'object',
        required: ['customerName', 'sizeId', 'ingredientIds'],
        properties: {
          customerName: { type: 'string', example: 'Ada Lovelace' },
          sizeId: { type: 'string', example: 'm' },
          ingredientIds: { type: 'array', minItems: 1, items: { type: 'string' }, example: ['cheese', 'pepperoni'] }
        }
      },
      PizzaUpdate: {
        type: 'object',
        properties: {
          customerName: { type: 'string', example: 'Grace Hopper' },
          sizeId: { type: 'string', example: 'l' },
          ingredientIds: { type: 'array', minItems: 1, items: { type: 'string' }, example: ['cheese'] }
        }
      },
      Size: {
        type: 'object',
        required: ['id', 'name', 'basePrice'],
        properties: {
          id: { type: 'string', example: 'm' },
          name: { type: 'string', example: 'Medium' },
          basePrice: { type: 'number', example: 20 }
        }
      },
      SizeUpdate: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'Large' },
          basePrice: { type: 'number', example: 25 }
        }
      },
      Ingredient: {
        type: 'object',
        required: ['id', 'name', 'extraPrice'],
        properties: {
          id: { type: 'string', example: 'cheese' },
          name: { type: 'string', example: 'Cheese' },
          extraPrice: { type: 'number', example: 2.5 }
        }
      },
      IngredientUpdate: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'Fresh Mozzarella' },
          extraPrice: { type: 'number', example: 3 }
        }
      }
    }
  }
};

export default swaggerDocument;
