const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Contacts API',
      version: '1.0.0',
      description: 'API for managing contacts',
    },
    servers: [
      { url: process.env.BASE_URL || 'http://localhost:8080' }
    ],
  },
  apis: ['./routes/*.js', './models/*.js']
};

const specs = swaggerJsdoc(options);
module.exports = specs;