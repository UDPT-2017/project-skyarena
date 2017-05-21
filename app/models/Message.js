const sequelize = require('../db/connection');
const SQ = require('sequelize');

var Message = sequelize.define('message', {
    text: {
        type: SQ.STRING,
    }
});


module.exports = Message;
