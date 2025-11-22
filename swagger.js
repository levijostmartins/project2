const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Library Bookstore API',
    description: 'Auto-generated documentation'
  },
  host: '',
  schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
