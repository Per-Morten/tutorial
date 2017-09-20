const debug = require('debug');
const Server = require('./app/classes/Server.js');
const Database = require('./app/classes/Database');

// Connect database
if(!module.parent) {
     Database.connect();
}

debug('App:server')('Starting process');

const port = Server.normalizePort(process.env.PORT || 3000);


Server.start(port);