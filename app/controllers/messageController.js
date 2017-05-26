const MessageRoom = require('../db/model').MessageRoom;
const Message = require('../db/model').Message;
const User = require('../db/model').User;
const Friend = require('../db/model').Friend;
const MessageStatus = require('../db/model').MessageStatus;

var messageController = {
    getAllFriend: function (req, res) {
      res.send(req.user);
    },
    getStatus: function (req, res) {
        MessageStatus.findAll({
            where: {
                userId: req.user.id,
                number:{
                    $gt: 0
                }
            },
            include: [{
                model: User,
                as: "user"
            },{
                model: User,
                as: "from"
            }],
            order:[
                ['updatedAt', 'DESC']
            ]
        }).then(function (messageStatuses) {
            res.send(messageStatuses);
        })
    },
    index: function (req, res) {
        res.render('message/index', {
            page: "message"
        })
    },
    chatRoom: function (req, res) {
        MessageRoom.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: Friend,
                as: "friends",
                foreignKey: "messageRoomId"
            }, {
                model: Message,
                as: "messages",
                foreignKey: "messageId",
                include: [{
                    model: User,
                    as: "user",
                    foreignKey: "userId"
                }]
            }]
        }).then(function (messageRoom) {
            if (messageRoom.friends[0].userId !== parseInt(req.user.id) && messageRoom.friends[0].toUserId !== parseInt(req.user.id)) {
                res.redirect('/');
                return;
            }
            var friend;
            if (messageRoom.friends[0].userId === parseInt(req.user.id)) {
                friend = messageRoom.friends[0].toUserId;
            } else {
                friend = messageRoom.friends[0].userId;
            }
            User.findById(friend).then(function (friend) {
                res.send({
                    session: req.user,
                    page: "message",
                    messages: messageRoom.messages,
                    friend: friend,
                    id: messageRoom.id
                });

            })

        })
    }
};

module.exports = messageController;

