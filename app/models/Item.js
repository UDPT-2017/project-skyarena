const sequelize = require('../db/connection');
const SQ = require('sequelize');

var Item = sequelize.define('item', {
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
        allowNull: {
            args: false,
            msg: 'Must have amount '
        }
    },
      price: {
        type: SQ.INTEGER,
        allowNull: {
            args: false,
            msg: 'Must have price '
        }
    },
    avatar: {
        type: SQ.STRING,
        allowNull: {
            args: false,
            msg: 'Must have an avatar'
        }
    }
   
});

module.exports = Item;