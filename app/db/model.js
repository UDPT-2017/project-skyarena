const User = require('../models/User');
const Friend = require('../models/Friend');
const MessageRoom = require('../models/MessageRoom');
const Message = require('../models/Message');
const MessageStatus = require('../models/MessageStatus');

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
    .then(function () {
        MessageStatus.belongsTo(User,{as: "user", foreignKey: "userId"});
        User.hasMany(MessageStatus,{as: "messageStatuses", foreignKey: "userId"});
        MessageStatus.belongsTo(User,{as: "from", foreignKey: "fromUserId"});
        MessageStatus.sync();
    })
;
module.exports = {
    User,
    Friend,
    MessageRoom,
    Message,
    MessageStatus
};

