const fs = require('fs');
const path = require('path');
const swaggerSpec = require('../swagger');
const outputPath = path.join(__dirname, '..', 'swagger.json');
fs.writeFileSync(outputPath, JSON.stringify(swaggerSpec(null), null, 2));
console.log('swagger.json generated at', outputPath);