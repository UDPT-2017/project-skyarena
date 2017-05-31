const User = require('../models/User');
const Friend = require('../models/Friend');
const MessageRoom = require('../models/MessageRoom');
const Message = require('../models/Message');
const MessageStatus = require('../models/MessageStatus');
const Premium = require('../models/Premium');



User.sync({force: true})
    .then(function () {
        Friend.belongsTo(User, {as: "from", foreignKey: "userId"});
        Friend.belongsTo(User, {as: "to", foreignKey: "toUserId"});
        User.hasMany(Friend, {as: "friends", foreignKey: "userId"});
        return MessageRoom.sync({force: true});
    })
    .then(function () {
        Friend.belongsTo(MessageRoom, {as: "messageRoom", foreignKey: "messageRoomId"});
        MessageRoom.hasMany(Friend, {as: "friends", foreignKey: "messageRoomId"});
        return Friend.sync({force: true});
    })
    .then(function () {
        Message.belongsTo(MessageRoom, {as: "messageRoom", foreignKey: "messageRoomId"});
        MessageRoom.hasMany(Message, {as: "messages", foreignKey: "messageRoomId"});
        Message.belongsTo(User,{as: "user", foreignKey: "userId"});
        Message.sync({force: true});
    })
    .then(function () {
        MessageStatus.belongsTo(User,{as: "user", foreignKey: "userId"});
        User.hasMany(MessageStatus,{as: "messageStatuses", foreignKey: "userId"});
        MessageStatus.belongsTo(User,{as: "from", foreignKey: "fromUserId"});
        MessageStatus.belongsTo(MessageRoom,{as: "in", foreignKey: "inMessageRoomId"});
        MessageStatus.sync({force: true});
    })
    .then(function () {
        Premium.belongsTo(User,{as: "user", foreignKey: "userId"});
        User.hasMany(Premium,{as:"premiumNotifications", foreignKey: "userId"});
        Premium.sync({force: true})
    })
;
module.exports = {
    User,
    Friend,
    MessageRoom,
    Message,
    MessageStatus,
    Premium
};

