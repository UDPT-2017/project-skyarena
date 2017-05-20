const sequelize = require('../db/connection');
const SQ = require('sequelize');

var Friend = sequelize.define('friend', {
    check:{
        type: SQ.BOOLEAN,
        defaultValue: false
    }
});


module.exports = Friend;