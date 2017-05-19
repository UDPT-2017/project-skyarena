const express = require('express');
const app = express();
var dotenv = require('dotenv');
dotenv.load();

require('./config/index')(app);

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
    console.log('connect to localhost:3000');
});