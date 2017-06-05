const sequelize = require('../db/connection');
const SQ = require('sequelize');

var Post = sequelize.define('user', {
    title: {
        type: SQ.STRING,
        allowNull: {
            args: false,
            msg: 'Must have title '
        }
    },
    content: {
        type: SQ.STRING,
        allowNull: {
            args: false,
            msg: 'Must have content '
        }
    }
});


module.exports = Post;
