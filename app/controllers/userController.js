const User = require('../db/model').User;
const SaltAndHash = require('../../config/password');
const cloudinary = require('../../config/cloudinary');
const _ = require('lodash');
const Paypal = require('paypal-express-checkout');
const Premium = require('../db/model').Premium;
const paypal = Paypal.init('idkwayta2-facilitator_api1.gmail.com', 'TNB4PQSPU3V752EB', 'AFcWxV21C7fd0v3bYYYRCpSSRl31AxKYhqoLdhcq-LL0ZJxEqndFi0Rn', 'http://localhost:3000/user/edit', 'http://www.example.com/cancel', true);

var userController = {
    loadLogin: function (req, res) {
        res.render('user/login', {
            page: "login"
        })
    },
    loadRegister: function (req, res) {
        res.render('user/register', {
            page: "register"
        })
    },
    register: function (req, res) {
        if (!req.files.avatar.path) {

        }
        cloudinary.uploader.upload(req.files.avatar.path, function (result) {
            var salt = SaltAndHash.salt();
            var hash = SaltAndHash.hash(salt, req.body.password);
            var body = _.pick(req.body, ['name', 'email']);
            var user = User.build(body);
            if (!result.url) {
                req.flash('info', 'Need an avatar');
                res.redirect('/user/register');
                return;
            }
            user.avatar = result.url;
            user.hash = hash;
            user.salt = salt;
            user.validate();
            user.save().then(function () {
                req.flash('info', 'New user added');
                req.session.key = user.id;
                req.login(user, function (err) {
                    if (err) {
                        console.log(err);
                    }
                    return res.redirect('/');
                });
            }).catch(function (e) {
                for (var i = 0; i < e.errors.length; i++) {
                    req.flash('info', e.errors[i].message);
                }

                res.redirect('/user/register');
            })
        });
    },
    login: function (req, res) {
        res.redirect('/');
    },
    logout: function (req, res) {
        req.logout();
        res.redirect('/');
    },
    loginFacebook: function (req, res) {
        res.redirect('/');
    },
    edit: function (req, res) {
        if (!req.isAuthenticated()) {
            req.flash('info', 'need to login');
            res.redirect('/user/login');
            return
        }
        res.locals.session = req.user;
        if (req.query.token && req.query.PayerID) {
            paypal.detail(req.query.token, req.query.PayerID, function (err, data, invoiceNumber, price) {
                if (err) {
                    req.flash("info", "something wrong");
                    res.redirect('/user/edit')
                }
                if (data.success) {
                    Premium.find({
                        where: {id: invoiceNumber},
                        include: [{
                            model: User,
                            as: "user",
                            foreignKey: "userId"
                        }]
                    }).then(function (premium) {
                        premium.token = req.query.token;
                        premium.PayerID = req.query.PayerID
                        return premium.save()
                    }).then(function (premium) {
                        return User.findById(premium.userId)

                    }).then(function (user) {
                        var currentDate = new Date();
                        if(user.premium && user.premium > currentDate){
                            currentDate = new Date(user.premium.getTime() + 30 * 24 * 60 * 60 * 1000);
                            user.premium = currentDate  ;
                        }else {
                            currentDate = new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000);
                            user.premium = currentDate ;
                        }

                        return user.save();
                    }).then(function (user) {
                        req.flash("info", "updated");
                        res.redirect('/user/edit')
                    })


                }
                else{
                    req.flash("info", "something wrong");
                    res.redirect('/user/edit')
                }

            });
        } else {
            res.render('user/edit');
        }
    },
    update: function (req, res) {
        if (req.body.oldPassword1 !== req.body.oldPassword2) {
            req.flash('info', 'please reconfirm your current password correctly');
            res.redirect('/user/edit');
            return;
        }
        User.findOne({where: {email: req.body.email}}).then(function (user) {
            if (!user) {
                req.flash('info', 'wrong email');
                res.redirect('/user/edit');
                return;
            }
            if (!SaltAndHash.validate(user.hash, user.salt, req.body.oldPassword1)) {
                req.flash('info', 'wrong password');
                res.redirect('/user/edit');
                return;
            }

            user.name = req.body.name;
            if (req.body.newPassword !== '') {
                user.hash = SaltAndHash.hash(user.salt, req.body.newPassword);
            }
            cloudinary.uploader.upload(req.files.avatar.path, function (result) {
                if (result.url) {
                    user.avatar = result.url;
                }
                user.save().then(function () {
                    req.flash('info', 'Updated');
                    res.redirect('/user/edit');
                })
            })

        });
    },
    addPremium: function (req, res) {
        if (!req.isAuthenticated()) {
            req.flash('info', 'need to login');
            res.redirect('/user/login');
            return
        }

        var premium = Premium.build({userId: req.user.id});
        premium.save().then(function () {
            console.log(premium.id.toString());
            paypal.pay(premium.id.toString(), 10, 'iPad', 'USD', true, function (err, url) {
                res.redirect(url);
            });
        })

    }
};

module.exports = userController;