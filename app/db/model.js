const User = require('../models/User');
const Friend = require('../models/Friend');
const MessageRoom = require('../models/MessageRoom');
const Message = require('../models/Message');
const MessageStatus = require('../models/MessageStatus');
const Premium = require('../models/Premium');
const Post = require('../models/Post');
const Merchant = require('../models/Merchant');
const Item = require('../models/Item');


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
        MessageStatus.belongsTo(MessageRoom,{as: "in", foreignKey: "inMessageRoomId"});
        MessageStatus.sync();
    })
    .then(function () {
        Premium.belongsTo(User,{as: "user", foreignKey: "userId"});
        User.hasMany(Premium,{as:"premiumNotifications", foreignKey: "userId"});
        Premium.sync();
    })
    .then(function () {
        Post.belongsTo(User,{as: "user", foreignKey: "userId"});
        User.hasMany(Post,{as:"post", foreignKey: "userId"});
        Post.sync();
    })
     .then(function () {
        Merchant.belongsTo(User,{as: "user", foreignKey: "userId"});
        Merchant.sync();
    })
     .then(function () {
        Item.belongsTo(Merchant,{as: "merchant", foreignKey: "merchnatID"});
        Merchant.hasMany(Item,{as:"item", foreignKey: "merchantID"});
        Item.sync();
    })
;
module.exports = {
    User,
    Friend,
    MessageRoom,
    Message,
    MessageStatus,
    Premium,
    Post,
    Merchant,
    Item
};
