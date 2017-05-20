const Message = require('../db/model').Message;
const User = require('../db/model').User;

var messageController = {
  index: function (req, res) {
      res.render('message/index',{
          page: "message"
      })
  }
};

module.exports = messageController;

