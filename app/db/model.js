const User = require('../models/User');
const Friend = require('../models/Friend');
const Message = require('../models/Message');
User.sync()
    .then(function () {
        Friend.belongsTo(User, {as: "from", foreignKey: "userId"});
        Friend.belongsTo(User, {as: "to", foreignKey: "toUserId"});
        User.hasMany(Friend, {as: "friends", foreignKey: "userId"});
        return Friend.sync();
    })
    .then(function () {
        Message.belongsTo(Friend, {as: "from", foreignKey: "friendId"});
        Friend.hasMany(Message, {as: "messages", foreignKey: "friendId"});
        Message.belongsTo(User, {as: "from", foreignKey: "userId"});
        return Message.sync();
    });
module.exports = {
    User,
    Friend,
    Message
};

