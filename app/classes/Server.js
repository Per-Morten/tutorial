const express = require('express');
const http = require('http');
const debug = require('debug');
const App = require('./app');


class Server {

    constructor() {
        this.express = App;
        this.onListening = this.onListening.bind(this);
        this.onError = this.onError.bind(this);
    }

    configure(key, value) {
        this.express.set(key, value);
    }

    start(port) {
        this.port = port;

        this.server = http.createServer(App);
        this.server.on('error', this.onError);
        this.server.on('listening', this.onListening);

        this.server.listen(this.port);
        return this.server;
    }

    normalizePort(val) {
        let port = (typeof val === 'string') ? parseInt(val, 10) : val;
        if (isNaN(port)) return val;
        else if (port >= 0) return port;
        else return false;
    }

    onListening() {
        let addr = this.server.address();
        let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
        debug('App:server')(`Listening on ${bind}`);
    }

    onError(error) {
        if (error.syscall !== 'listen') throw error;
        const bind = (typeof this.port === 'string') ? `Pipe  ${this.port}` : `Port ${this.port}`;
        switch(error.code) {
            case 'EACCES':
                console.error(`${bind} requires elevated privileges`);
                process.exit(1);
            break;
            case 'EADDRINUSE':
                console.error(`${bind} is already in use`);
                process.exit(1);
            break;
            default:
                throw error;
        }
    }

}

module.exports = new Server();