var Strategy = require('passport-local').Strategy;
const SaltAndHash = require('../config/password');
const User = require('../app/db/model').User;
const passport = require('passport');
var facebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function (id, done) {
    User.find({
        where: {id: id}
    }).then(function (user) {
        done(null, user);
    }, function (err, user) {
        done(err, user);
    });
});
passport.use(new facebookStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.FACEBOOKCALLBACK ,
        passReqToCallback: true,
        scope: ['user_friends'],
        profileFields: ['id', 'displayName', 'photos', 'email', 'friends']
    },
    function (req, accessToken, refreshToken, profile, cb) {
        User.findOne({where: {email: profile.emails[0].value}})
            .then(function (user) {
                if (user != null) {
                    return cb(null, user, req.flash('info', 'welcome back'));
                } else {
                    return User.findOne({where: {facebookId: profile.id}});
                }
            })
            .then(function (user) {
                if (user != null) {
                    return cb(null, user, req.flash('info', 'welcome back'));
                } else {
                    user = User.build({
                        facebookId: profile.id,
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        avatar: profile.photos[0].value
                    });
                    user.save().then(function (user) {
                        return cb(null, user, req.flash('info', 'Welcome from facebook'));
                    }).catch(function (e) {
                        console.log(e);
                    })
                }
            })

    }));
passport.use(new Strategy({passReqToCallback: true}, function (req, email, password, cb) {
    User.findOne({where: {email: email}}).then(function (user) {
        if (!user) {
            return cb(null, false, req.flash('info', 'wrong email or password'));
        }
        if (SaltAndHash.validate(user.hash, user.salt, password)) {
            return cb(null, user, req.flash('info', 'welcome back'));
        }
        return cb(null, false, req.flash('info', 'wrong email or password'));
    });
}));
module.exports = passport;