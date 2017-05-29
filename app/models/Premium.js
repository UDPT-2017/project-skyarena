const sequelize = require('../db/connection');
const SQ = require('sequelize');

var Premium = sequelize.define('premium', {
    status: {
        type: SQ.STRING
    },
    token:{
        type: SQ.STRING
    },
    PayerID:{
        type: SQ.STRING
    }
});


module.exports = Premium;
