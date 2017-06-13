const sequelize = require('../db/connection');
const SQ = require('sequelize');

var Video = sequelize.define('comment', {
    text: {
        type: SQ.STRING,
        allowNull: {
            args: false,
            msg: 'Must have text '
        }
    }
});


module.exports = Video;