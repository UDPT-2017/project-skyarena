const sequelize = require('../db/connection');
const SQ = require('sequelize');

var Post = sequelize.define('answer', {
    text: {
        type: SQ.STRING,
        allowNull: {
            args: false,
            msg: 'Must have text '
        }
    }
});


module.exports = Post;
