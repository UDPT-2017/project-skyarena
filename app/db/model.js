const User = require('../models/User');
const Friend = require('../models/Friend');
const MessageRoom = require('../models/MessageRoom');
const Message = require('../models/Message');

User.sync()
    .then(function () {
        Friend.belongsTo(User, {as: "from", foreignKey: "userId"});
        Friend.belongsTo(User, {as: "to", foreignKey: "toUserId"});
        User.hasMany(Friend, {as: "friends", foreignKey: "userId"});
        return MessageRoom.sync();
    })
    .then(function () {
        Friend.belongsTo(MessageRoom, {as: "messageRoom", foreignKey: "messageRoomId"});
        MessageRoom.hasMany(Friend, {as: "friends", foreignKey: "messageRoomId"});
        return Friend.sync();
    })
    .then(function () {
        Message.belongsTo(MessageRoom, {as: "messageRoom", foreignKey: "messageRoomId"});
        MessageRoom.hasMany(Message, {as: "messages", foreignKey: "messageRoomId"});
        Message.belongsTo(User,{as: "user", foreignKey: "userId"});
        Message.sync();
    })
;
module.exports = {
    User,
    Friend,
    MessageRoom,
    Message
};

