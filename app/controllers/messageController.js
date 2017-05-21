const MessageRoom = require('../db/model').MessageRoom;
const Message = require('../db/model').Message;
const User = require('../db/model').User;
const Friend = require('../db/model').Friend;

var messageController = {
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
            if (messageRoom.friends[0].userId !== parseInt(req.params.id) && messageRoom.friends[0].toUserId !== parseInt(req.params.id)) {
                res.redirect('/');
                return;
            }
            var friend;
            if(messageRoom.friends[0].userId === parseInt(req.params.id)){
                friend = messageRoom.friends[0].toUserId;
            } else{
                friend = messageRoom.friends[0].userId;
            }
            User.findById(friend).then(function (friend) {
                res.render('message/show', {
                    page: "message",
                    messages: messageRoom.messages,
                    friend: friend
                })
            })

        })
    }
};

module.exports = messageController;

