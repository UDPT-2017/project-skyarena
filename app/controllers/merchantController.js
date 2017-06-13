const User = require('../db/model').User;
const Merchnat = require('../db/model').Merchant;
const cloudinary = require('../../config/cloudinary');
const _ = require('lodash');
const Premium = require('../db/model').Premium;


var merchantController = {
    loadRegister: function (req, res) {
        res.render('merchant/register', {
            page: "register"
        })
    },
    register: function (req, res, next) {
        try {
            cloudinary.uploader.upload(req.files.avatar.path, function (result) {
                var body = _.pick(req.body, ['name', 'stock']);
                var merchant = Merchant.build(body);
                if (!result.url) {
                    req.flash('info', 'Need an avatar');
                    res.redirect('/merchant/register');
                    return;
                }
                merchant.avatar = result.url;
                merchant.userId = req.user.id;
               
                merchant.validate();
                merchant.save().then(function () {
                    req.flash('info', 'New shop added');
                    res.render('merchant/index', {
            				page: "index"
       					 });
                }).catch(function (e) {
                    if(e.errors.length){
                        for (var i = 0; i < e.errors.length; i++) {
                            req.flash('info', e.errors[i].message);
                        }

                        res.redirect('/merchant/register');
                    }else{
                        next(e);
                    }

                })
            });
        } catch (e) {
            next(e)
        }

    },

};

module.exports = merchantController;