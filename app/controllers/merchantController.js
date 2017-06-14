const User = require('../db/model').User;
const Merchant = require('../db/model').Merchant;
const cloudinary = require('../../config/cloudinary');
const _ = require('lodash');
const Premium = require('../db/model').Premium;


var merchantController = {
	index: function (req, res) {

		Merchant.findOne({where: {userId: req.user.id}}).then(function (merchant) {
            if (merchant) {
            	 res.render('merchant/index', {
            page: 'merchant',
            host: process.env.HOST
       		 })
                
            } else {
            	res.render('merchant/register', {
            page: "register"
        })
                
            }
        });
   
    },
    loadRegister: function (req, res) {
        res.render('merchant/register', {
            page: "register"
        })
    },
    register: function (req, res, next) {
        try {
            cloudinary.uploader.upload(req.files.avatar.path, function (result) {
            
                var merchant = Merchant.build({name: req.body.name});
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