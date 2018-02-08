const http = require('http');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const index = require('./routes/index');
const mongoose = require('mongoose');
const DBusername = process.env.DB_USER;
const DBpassword = process.env.DB_PASS;
const DBConnStr = `mongodb://${DBusername}:${DBpassword}@localhost/story-of-my-life`;

let app = express();


/* Override deprecated promise in mongoose */
mongoose.Promise = global.Promise;

/* Connect to MongoDB and Create database 'story-of-my-life' if it doesn't exist */
mongoose.connect(DBConnStr).catch((err) =>{ console.log(err); });

/* Load middleware */
app.use(logger('dev')); // log http requests to the console
app.use(bodyParser.json());// parse application/json
app.use(bodyParser.urlencoded({extended: true})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

/* Routes */
app.use('/', index);

/* catch 404 and send error message */
app.use(function (req, res) {
    let err = new Error('Route does not exist');
    err.status = 404;

    /* set locals, only providing error in development */
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    /* Return error message */
    res.status(err.status || 500);
    res.send({
        errorMsg: 'Not Found',
        cause: 'Resource does not exists',
        fix: 'Confirm your URL is typed correctly'
    });
});

/* Create HTTP server.*/
const server = http.createServer(app);

/*Set port number and Listen on all network interfaces. */
const port = process.env.PORT || 3050;
server.listen(port);

/* Event listener for HTTP server "error" event. */
server.on('error', () => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ?
        'Pipe ' + port : 'Port ' + port;

    /* handle specific listen errors with friendly messages */
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
});