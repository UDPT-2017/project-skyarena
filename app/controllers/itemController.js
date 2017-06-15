const Item = require('../db/model').Item;
const Merchnat = require('../db/model').Merchant;
const cloudinary = require('../../config/cloudinary');
const _ = require('lodash');



var itemController = {
	loadAdd: function (req, res) {
        res.render('merchant/add', {
            page: "addItem"
        })
    },

    getItem: function (req, res) {
        var itemList = [];
        var offset = req.query.page ;
        var query = req.query.query;
        Item.findAll({
            where: {
                userID: req.query.id,
                check: true
            }
        }).then(function (items) {
            items.forEach(function (item) {

            	itemList.push({
                        id: item.id,
                        name: item.name,
                        avatar: item.avatar,
     
                    });
            });
             res.send(itemList);
        });

    
           
    },
    addItem: function (req, res, next) {
        try {
            cloudinary.uploader.upload(req.files.avatar.path, function (result) {
                var body = _.pick(req.body, ['name', 'description','amount']);
                var item = Item.build(body);
                
                if (!result.url) {
                    req.flash('info', 'Need an avatar');
                    res.redirect('/merchant/register');
                    return;
                }
                item.avatar = result.url;
                item.userId = req.user.id;
               	
                item.validate();
                item.save().then(function () {
                    req.flash('info', 'New shop added');
                    res.render('merchant/index', {
            				page: "index"
       					 });
                }).catch(function (e) {
                    if(e.errors.length){
                        for (var i = 0; i < e.errors.length; i++) {
                            req.flash('info', e.errors[i].message);
                        }

                        res.redirect('/merchant/index');
                    }else{
                        next(e);
                    }

                })
            });
        } catch (e) {
            next(e)
        }

    },

    removeItem: function (req, res) {
        Item.findOne({where: {itemId: req.item.id}}).then(function (friend) {
            if (item) {
                item.destroy();

        
            } else {
                res.send({succes: false})
            }
        });
    }

};

module.exports = itemController;
