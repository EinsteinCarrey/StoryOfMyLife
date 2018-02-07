const debug = require('debug')('storyofmylife:server');
const http = require('http');
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const index = require('./routes/index');

let app = express();

//Load middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// Routes
app.use('/', index);

// catch 404 and send error message
app.use(function (req, res) {
    let err = new Error('Not Found');
    err.status = 404;

    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Return error message
    res.status(err.status || 500);
    res.send('Not Found');
});


//Set port number
const port = process.env.PORT || 3050;
app.set('port', port);

//Create HTTP server.
const server = http.createServer(app);

//Listen on provided port, on all network interfaces.
server.listen(port);

//Event listener for HTTP server "error" event.
server.on('error', () => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ?
        'Pipe ' + port : 'Port ' + port;

    // handle specific listen errors with friendly messages
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

//Event listener for HTTP server "listening" event.
server.on('listening', () => {

    const addr = server.address();
    const bind = typeof addr === 'string' ?
        'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
});