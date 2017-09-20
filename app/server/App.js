const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const serverMiddleware = require('../middlewares/server');

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  middleware() {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    Object.values(serverMiddleware).map(middleware => this.express.use(middleware));
  }

  // Configure API endpoints.
  routes() {
    /* This is just to get up and running, and to make sure what we've got is
     * working so far. This function will change when we start to add more
     * API endpoints */
    let router = express.Router();
    // placeholder route handler
    require('../controllers/People')(router);

    this.express.use('/', router);
  }

}

module.exports = new App().express;
