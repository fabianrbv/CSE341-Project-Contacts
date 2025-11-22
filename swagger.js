const fs = require('fs');
const path = require('path');

const swaggerFile = path.join(__dirname, 'swagger.json');
const swaggerData = JSON.parse(fs.readFileSync(swaggerFile, 'utf8'));

module.exports = swaggerData;