const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.load();



app.set('port', (process.env.PORT || 3000));

var server = app.listen(app.get('port'), function () {
    console.log('connect to localhost:3000');
});

require('./config/index')(app);
require('./config/socket.io')(server);
