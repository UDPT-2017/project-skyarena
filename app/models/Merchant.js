const sequelize = require('../db/connection');
const SQ = require('sequelize');

var Merchant = sequelize.define('merchant', {
	 name: {
        type: SQ.STRING,
        allowNull: {
            args: false,
            msg: 'Must have name '
        }
    },
    avatar: {
        type: SQ.STRING,
        allowNull: {
            args: false,
            msg: 'Must have an avatar'
        }
    },
     phone: {
        type: SQ.STRING,
        allowNull: {
            args: false,
            msg: 'Must have an phone number'
        }
    },
     stock: {
        type: SQ.INTEGER,
    }
});

module.exports = Merchant;