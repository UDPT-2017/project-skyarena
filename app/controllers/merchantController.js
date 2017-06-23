const User = require("../db/model").User;
const Merchant = require("../db/model").Merchant;
const Item = require("../db/model").Item;
const cloudinary = require("../../config/cloudinary");
const _ = require("lodash");
const Premium = require("../db/model").Premium;

var merchantController = {
  index: function(req, res) {
    Merchant.findOne({ where: { userId: req.user.id } }).then(function(
      merchant
    ) {
      if (merchant) {
        Item.findAll({ where: { userId: req.user.id } }).then(function(items) {
          res.render("merchant/index", {
            page: "merchant",
            items
          });
        });
      } else {
        res.render("merchant/nomer", {
          page: "Warning",
          host: process.env.HOST
        });
      }
    });
  },
  loadRegister: function(req, res) {
    res.render("merchant/register", {
      page: "register"
    });
  },
  getMerchant: function (req, res) {
        var merchantList = [];
        var offset = req.query.page ;
        var query = req.query.query;
        Merchant.findAll()
        	//.then(function (merchants) {
           // merchants.forEach(function (merchant) {

            	//merchantList.push({
                      //  id: merchant.id,
                     //   name: merchant.name,
                    //    avatar: merchant.avatar,
     
                  // });
           // });
       // })
            .then(function(merchants) {
          res.render("merchant/shop", {
            page: "shop",
            merchants
          });
        });
           // console.log(merchantList);
           //  res.send(merchantList);       
    },
    showMerchant: function(req, res) {
    Merchant.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(merchant) {
    	Item.findAll({ where: { merchantId: merchant.id } }).then(function(items) {
      res.render("merchant/merchantdetail", {
        page: "merchantdetail",
        merchant,
        items
    })
  });
      console.log(merchant);
      //console.log(items);
    });
  },
  register: function(req, res, next) {
    try {
      cloudinary.uploader.upload(req.files.avatar.path, function(result) {
        var merchant = Merchant.build({ name: req.body.name,phone:req.body.phone });
        if (!result.url) {
          req.flash("info", "Need an avatar");
          res.redirect("/merchant/register");
          return;
        }
        merchant.avatar = result.url;
        merchant.userId = req.user.id;

        merchant.validate();
        merchant
          .save()
          .then(function() {
            req.flash("info", "New shop added");
            res.render("merchant/index", {
              page: "index"
            });
          })
          .catch(function(e) {
            if (e.errors.length) {
              for (var i = 0; i < e.errors.length; i++) {
                req.flash("info", e.errors[i].message);
              }

              res.redirect("/merchant/register");
            } else {
              next(e);
            }
          });
      });
    } catch (e) {
      next(e);
    }
  }
};

module.exports = merchantController;
