const sequelize = require('../db/connection');
const SQ = require('sequelize');

var MessageRoom = sequelize.define('messageRoom', {
});


module.exports = MessageRoom;