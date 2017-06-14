const User = require("../models/User");
const Friend = require("../models/Friend");
const MessageRoom = require("../models/MessageRoom");
const Message = require("../models/Message");
const MessageStatus = require("../models/MessageStatus");
const Premium = require("../models/Premium");
const Post = require("../models/Post");
const Video = require("../models/Video");
const Rating = require("../models/Rating");
const Comment = require("../models/Comment");
const Merchant = require("../models/Merchant");
const Item = require("../models/Item");
User.sync()
  .then(function() {
    Friend.belongsTo(User, {
      as: "from",
      foreignKey: "userId"
    });
    Friend.belongsTo(User, {
      as: "to",
      foreignKey: "toUserId"
    });
    User.hasMany(Friend, {
      as: "friends",
      foreignKey: "userId"
    });
    return MessageRoom.sync({force: true});
  })
  .then(function() {
    Friend.belongsTo(MessageRoom, {
      as: "messageRoom",
      foreignKey: "messageRoomId"
    });
    MessageRoom.hasMany(Friend, {
      as: "friends",
      foreignKey: "messageRoomId"
    });
    return Friend.sync({force: true});
  })
  .then(function() {
    Message.belongsTo(MessageRoom, {
      as: "messageRoom",
      foreignKey: "messageRoomId"
    });
    MessageRoom.hasMany(Message, {
      as: "messages",
      foreignKey: "messageRoomId"
    });
    Message.belongsTo(User, {
      as: "user",
      foreignKey: "userId"
    });
    return Message.sync({force: true});
  })
  .then(function() {
    MessageStatus.belongsTo(User, {
      as: "user",
      foreignKey: "userId"
    });
    User.hasMany(MessageStatus, {
      as: "messageStatuses",
      foreignKey: "userId"
    });
    MessageStatus.belongsTo(User, {
      as: "from",
      foreignKey: "fromUserId"
    });
    MessageStatus.belongsTo(MessageRoom, {
      as: "in",
      foreignKey: "inMessageRoomId"
    });
    return MessageStatus.sync({force: true});
  })
  .then(function() {
    Premium.belongsTo(User, {
      as: "user",
      foreignKey: "userId"
    });
    User.hasMany(Premium, {
      as: "premiumNotifications",
      foreignKey: "userId"
    });
    return Premium.sync({force: true});
  })
  .then(function() {
    Post.belongsTo(User, {
      as: "user",
      foreignKey: "userId"
    });
    User.hasMany(Post, {
      as: "posts",
      foreignKey: "userId"
    });
    return Post.sync({force: true});
  })
  .then(function() {
    Video.belongsTo(User, {
      as: "user",
      foreignKey: "userId"
    });
    User.hasMany(Video, {
      as: "videos",
      foreignKey: "userId"
    });
    return Video.sync({force: true});
  })
  .then(function() {
    Rating.belongsTo(User, {
      as: "user",
      foreignKey: "userId"
    });
    Rating.belongsTo(Video, {
      as: "video",
      foreignKey: "videoId"
    });
    return Rating.sync({force: true});
  })
  .then(function() {
    Comment.belongsTo(User, {
      as: "user",
      foreignKey: "userId"
    });
    Video.hasMany(Comment, {
      as: "comments",
      foreignKey: "videoId"
    });
    Comment.belongsTo(Video, {
      as: "video",
      foreignKey: "videoId"
    });
    return Comment.sync({force: true});
  })
  .then(function() {
    Merchant.belongsTo(User, { as: "user", foreignKey: "userId" });
    return Merchant.sync({force: true});
  })
  .then(function() {
    Item.belongsTo(Merchant, { as: "merchant", foreignKey: "merchnatID" });
    Merchant.hasMany(Item, { as: "item", foreignKey: "merchantID" });
    return Item.sync({force: true});
  });




User.sync()
  .then(function() {
    Friend.belongsTo(User, {
      as: "from",
      foreignKey: "userId"
    });
    Friend.belongsTo(User, {
      as: "to",
      foreignKey: "toUserId"
    });
    User.hasMany(Friend, {
      as: "friends",
      foreignKey: "userId"
    });
    return MessageRoom.sync();
  })
  .then(function() {
    Friend.belongsTo(MessageRoom, {
      as: "messageRoom",
      foreignKey: "messageRoomId"
    });
    MessageRoom.hasMany(Friend, {
      as: "friends",
      foreignKey: "messageRoomId"
    });
    return Friend.sync();
  })
  .then(function() {
    Message.belongsTo(MessageRoom, {
      as: "messageRoom",
      foreignKey: "messageRoomId"
    });
    MessageRoom.hasMany(Message, {
      as: "messages",
      foreignKey: "messageRoomId"
    });
    Message.belongsTo(User, {
      as: "user",
      foreignKey: "userId"
    });
    return Message.sync();
  })
  .then(function() {
    MessageStatus.belongsTo(User, {
      as: "user",
      foreignKey: "userId"
    });
    User.hasMany(MessageStatus, {
      as: "messageStatuses",
      foreignKey: "userId"
    });
    MessageStatus.belongsTo(User, {
      as: "from",
      foreignKey: "fromUserId"
    });
    MessageStatus.belongsTo(MessageRoom, {
      as: "in",
      foreignKey: "inMessageRoomId"
    });
    return MessageStatus.sync();
  })
  .then(function() {
    Premium.belongsTo(User, {
      as: "user",
      foreignKey: "userId"
    });
    User.hasMany(Premium, {
      as: "premiumNotifications",
      foreignKey: "userId"
    });
    return Premium.sync();
  })
  .then(function() {
    Post.belongsTo(User, {
      as: "user",
      foreignKey: "userId"
    });
    User.hasMany(Post, {
      as: "posts",
      foreignKey: "userId"
    });
    return Post.sync();
  })
  .then(function() {
    Video.belongsTo(User, {
      as: "user",
      foreignKey: "userId"
    });
    User.hasMany(Video, {
      as: "videos",
      foreignKey: "userId"
    });
    return Video.sync();
  })
  .then(function() {
    Rating.belongsTo(User, {
      as: "user",
      foreignKey: "userId"
    });
    Rating.belongsTo(Video, {
      as: "video",
      foreignKey: "videoId"
    });
    return Rating.sync();
  })
  .then(function() {
    Comment.belongsTo(User, {
      as: "user",
      foreignKey: "userId"
    });
    Video.hasMany(Comment, {
      as: "comments",
      foreignKey: "videoId"
    });
    Comment.belongsTo(Video, {
      as: "video",
      foreignKey: "videoId"
    });
    return Comment.sync();
  })
  .then(function() {
    Merchant.belongsTo(User, { as: "user", foreignKey: "userId" });
    return Merchant.sync();
  })
  .then(function() {
    Item.belongsTo(Merchant, { as: "merchant", foreignKey: "merchnatID" });
    Merchant.hasMany(Item, { as: "item", foreignKey: "merchantID" });
    return Item.sync();
  });
module.exports = {
  User,
  Friend,
  MessageRoom,
  Message,
  MessageStatus,
  Premium,
  Post,
  Video,
  Rating,
  Comment,
  Merchant,
  Item
};
