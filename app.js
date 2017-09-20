// import * as debug from 'debug';

// import Database from './server/Database';
// import Server from './server/Server';
// import {UserModel} from './models/User';


// if (!module.parent) {
//   Database.connect();
// }

// debug('Octane:server')('Starting process');


// // Set the Port of the application
// const port = Server.normalizePort(process.env.PORT || 3000);
// Server.configure('port', port);


// // Start the server
// Server.start(<number>port);

const debug = require('debug');
const Server = require('./app/server/Server.js');
// const Database = require('./server/Database');

// Connect database
// if(!module.parent) {
//     // Database.connect();
// }

debug('App:server')('Starting process');

const port = Server.normalizePort(process.env.PORT || 3000);

Server.start(port);


