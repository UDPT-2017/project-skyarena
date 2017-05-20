const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.load();

require('./config/index')(app);

app.set('port', (process.env.PORT || 3000));

var server = app.listen(app.get('port'), function () {
    console.log('connect to localhost:3000');
});
var io = require('socket.io').listen(server);