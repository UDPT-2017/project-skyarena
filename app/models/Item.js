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
    description: {
        type: SQ.STRING,
        allowNull: {
            args: false,
            msg: 'Must have name '
        }
    },
      amount: {
        type: SQ.INTEGER,
    },
    avatar: {
        type: SQ.STRING,
        allowNull: {
            args: false,
            msg: 'Must have an avatar'
        }
    }
   
});

module.exports = Merchant;