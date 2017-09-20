const debug = require('debug');
const Server = require('./app/server/Server.js');
const Database = require('./app/server/Database');

// Connect database
if(!module.parent) {
     Database.connect();
}

debug('App:server')('Starting process');

const port = Server.normalizePort(process.env.PORT || 3000);


Server.start(port);