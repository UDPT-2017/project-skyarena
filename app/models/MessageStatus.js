const sequelize = require('../db/connection');
const SQ = require('sequelize');

var MessageRoom = sequelize.define('messageStatus', {
    number: {
        type: SQ.INTEGER,
    }
});


module.exports = MessageRoom;
