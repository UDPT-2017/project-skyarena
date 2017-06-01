const express = require('express');
const bodyParser = require('body-parser');
const session   = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
const helmet = require('helmet');
var RedisStore = require('connect-redis')(session);

module.exports = function(app){
    app.use(helmet());
    app.use(express.static('public'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(session( {
        secret : process.env.SESSION_SECRET ,
        resave : false,
        saveUninitialized : false,
        maxAge: null,
        store: new RedisStore({
            url: process.env.REDIS_URL
        })
    }));
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());

};