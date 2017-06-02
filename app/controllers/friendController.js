const User = require('../db/model').User;
const Friend = require('../db/model').Friend;
const _ = require('lodash');
const MessageRoom = require('../db/model').MessageRoom;

var friendController = {
    index: function (req, res) {
        res.render('friend/index', {
            page: 'friend',
            host: process.env.HOST
        })
    },
    getCount: function (req, res) {
        User.findAll({
            where: {
                id: {
                    $ne: req.user.id
                },
                name: {
                    $like: '%' + req.query.query + '%'
                }
            }
        }).then(function (user) {
            res.send({count: user.length});
        })
    },
    getFriend: function (req, res) {
        var friendList = [];
        var userFriend = [];
        var requestingFriend = [];
        var requestedFriend = [];
        var offset = req.query.page ;
        var query = req.query.query;
        Friend.findAll({
            where: {
                userId: req.user.id,
                check: true
            }
        }).then(function (friends) {
            friends.forEach(function (friend) {
                userFriend.push(friend.toUserId);
            });
            return Friend.findAll({
                where: {
                    userId: req.user.id,
                    check: false
                }
            })
        }).then(function (friends) {
            friends.forEach(function (friend) {
                requestingFriend.push(friend.toUserId)
            });
            return Friend.findAll({
                where: {
                    toUserId: req.user.id,
                    check: false
                }
            })
        }).then(function (friends) {
            friends.forEach(function (friend) {
                requestedFriend.push(friend.userId);
            });

            return User.findAll({
                where: {
                    id: {
                        $ne: req.user.id
                    },
                    name: {
                        $like: '%' + query + '%'
                    }
                },
                limit: 18,
                offset: parseInt(offset)*18
            })
        }).then(function (users) {
            users.forEach(function (user) {
                if (userFriend.includes(user.id)) {
                    friendList.push({
                        id: user.id,
                        name: user.name,
                        avatar: user.avatar,
                        friend: true,
                        accept: true
                    });
                    return;
                }
                if (requestingFriend.includes(user.id)) {
                    friendList.push({
                        id: user.id,
                        name: user.name,
                        avatar: user.avatar,
                        friend: true,
                        accept: false
                    });
                    return;
                }
                if (requestedFriend.includes(user.id)) {
                    friendList.push({
                        id: user.id,
                        name: user.name,
                        avatar: user.avatar,
                        friend: false,
                        accept: true
                    });
                    return;
                }
                friendList.push({
                    id: user.id,
                    name: user.name,
                    avatar: user.avatar,
                    friend: false,
                    accept: false
                });

            });
            res.send(friendList);
        })
    },
    addFriend: function (req, res) {
        if (req.user.id === parseInt(req.query.id)) {
            res.send({success: false});
            return;
        }
        Friend.findAll({where: {userId: req.user.id, toUserId: req.query.id}}).then(function (friend) {
            if (friend.length !== 0) {
                res.send({success: false});
            } else {
                friend = Friend.build({userId: req.user.id, toUserId: req.query.id});
                friend.save().then(function () {
                    res.send({success: true});
                });
            }
        });

    },
    acceptFriend: function (req, res) {
        if (req.user.id === parseInt(req.query.id)) {
            res.send({success: false});
            return;
        }
        var messageRoom = MessageRoom.build({});
        var friend;
        Friend.findAll({where: {toUserId: req.user.id, userId: req.query.id}}).then(function (friends) {
            if (friends.length !== 0) {
                friends[0].check = true;
                friends[0].save().then(function () {
                    friend = Friend.build({userId: req.user.id, toUserId: req.query.id, check: true});
                    return friend.save();
                }).then(function () {
                    return messageRoom.save();
                }).then(function () {
                    friends[0].messageRoomId = messageRoom.id;
                    friends[0].save();
                    friend.messageRoomId = messageRoom.id;
                    friend.save();
                    res.send({success: true});
                })
            } else {
                res.send({success: false});
            }
        });
    },
    removeFriend: function (req, res) {
        Friend.findOne({where: {userId: req.user.id, toUserId: req.query.id}}).then(function (friend) {
            var messageRoomId;
            if (friend) {
                friend.destroy().then(function () {
                    return Friend.findOne({where: {toUserId: req.user.id, userId: req.query.id}})
                }).then(function (friend) {
                    messageRoomId = friend.messageRoomId;
                    return friend.destroy()
                }).then(function () {
                    return MessageRoom.findById(messageRoomId)
                }).then(function (messageRoom) {
                    messageRoom.destroy();
                    res.send({succes: true})
                })
            } else {
                res.send({succes: false})
            }
        });
    }

};

module.exports = friendController;
