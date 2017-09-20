const mongoose = require('mongoose');
const debug = require('debug');
const dbConfig = require('../config/database');


class Database {

    
    constructor() {
        this.mongoose = mongoose;
        this.mongoose.Promise = global.Promise;

        // Set up mongoose event listeners
        this.mongoose.connection.on('connected', this.onConnect);
        this.mongoose.connection.on('disconnected', this.onDisconnect);
        this.mongoose.connection.on('error', this.onError);
    }
    connect() {
        this.mongoose.connect(dbConfig.uri, dbConfig.options);
        return this.mongoose;
    }
    onConnect() {
        debug('App:server')(`Mongoose connected with uri ${dbConfig.uri}`);
    }
    onDisconnect() {
        console.log('Server disconnected');
    }
    onError(error) {
        console.error(`mongoose errored out ${error}`);
    }

}

module.exports = new Database();