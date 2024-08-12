const express = require('express');
const app = express();
const http = require('http');
const config = require('./utils/config');
const logger = require('./utils/logger');

require('./database/db')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`server running on port ${config.PORT}`);
});
