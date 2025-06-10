// api/index.js
const serverless = require('serverless-http');
const app = require('../index'); // point to the main app

module.exports.handler = serverless(app);
