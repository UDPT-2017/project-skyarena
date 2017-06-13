const sequelize = require('../db/connection');
const SQ = require('sequelize');

var Rating = sequelize.define('rating', {
    like: {
        type: SQ.BOOLEAN
    }
});


module.exports = Rating;
