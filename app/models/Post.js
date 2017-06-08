const sequelize = require('../db/connection');
const SQ = require('sequelize');

var Post = sequelize.define('post', {
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
