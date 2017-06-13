const sequelize = require('../db/connection');
const SQ = require('sequelize');

var Video = sequelize.define('video', {
    title: {
        type: SQ.STRING,
        allowNull: {
            args: false,
            msg: 'Must have title '
        }
    },
    url: {
        type: SQ.STRING,
        allowNull: {
            args: false,
            msg: 'Must have url '
        }
    },
    description: {
        type: SQ.STRING,
        allowNull: {
            args: false,
            msg: 'Must have description '
        }
    },
    views: {
        type: SQ.INTEGER,
        defaultValue: 0
    },
    like: {
        type: SQ.INTEGER,
        defaultValue: 0
    },
    dislike: {
        type: SQ.INTEGER,
        defaultValue: 0
    }
});


module.exports = Video;