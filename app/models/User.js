const sequelize = require('../db/connection');
const SQ = require('sequelize');

var User = sequelize.define('user', {
    email: {
        type: SQ.STRING,
        allowNull: {
            args: false,
            msg: 'Must have email '
        },
        unique: {
            args: true,
            msg: 'Email address already in use!'
        },
        validate: {
            isEmail: {
                args: true,
                msg: 'Must be real email'
            }
        }

    },
    name: {
        type: SQ.STRING

    },
    avatar: {
        type: SQ.STRING,
        allowNull: {
            args: false,
            msg: 'Must have an avatar'
        }
    },
    salt: {
        type: SQ.STRING,
        allowNull: {
            args: false
        }
    },
    hash: {
        type: SQ.STRING,
        allowNull: {
            args: false
        }
    },
    facebookId: {
        type: SQ.STRING
    },
    googleId: {
        type: SQ.STRING
    },
    check: {
        type: SQ.BOOLEAN,
        defaultValue: false
    },
    premium: {
        type: SQ.DATE
    }
}, {
    instanceMethods:{
        paypal_url: function () {
            var url = `https://www.sandbox.paypal.com/cgi-bin/webscr?`;
            url += encodeURIComponent(`business=idkwayta2-facilitator@gmail.com&&cmd=_cart&&invoice=test`);
            console.log(url)
        }
    }
});


module.exports = User;