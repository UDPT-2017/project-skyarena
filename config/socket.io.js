const Message = require("../app/db/model").Message;
const MessageStatus = require('../app/db/model').MessageStatus;
const User = require('../app/db/model').User;
const Friend = require('../app/db/model').Friend;

module.exports = function (server) {
    var io = require('socket.io').listen(server);
    var user = {};
    io.sockets.on('connection', function (socket) {
        socket.on("ONLINE", function (data) {
            User.findById(data.userId).then(function (result) {
                result.check = true;
                result.save();

                user[socket.id] = result.id;

            })
        });
        socket.on("JOIN", function (data) {
            socket.join(data.id);
            socket.broadcast.to(data.id).emit('UPDATE_USER_ONLINE');
        });
        socket.on("NEW_MESSAGE", function (data) {
            var message = Message.build({});
            message.userId = parseInt(data.userId);
            message.text = data.text;
            message.messageRoomId = data.id;
            message.save()
                .then(function () {
                    return MessageStatus.findOne({
                        where: {
                            userId: data.friend,
                            fromUserId: parseInt(data.userId)
                        }
                    });

                })
                .then(function (messageStatus) {
                    if (messageStatus) {
                        messageStatus.number += 1;
                    } else {
                        messageStatus = MessageStatus.build({
                            number: 1,
                            userId: data.friend,
                            inMessageRoomId: data.id,
                            fromUserId: parseInt(data.userId)
                        });
                    }
                    return messageStatus.save()
                })
                .then(function () {
                    io.to(data.id.toString()).emit("CREATED_MESSAGE", {
                        name: data.name,
                        avatar: data.avatar,
                        createdAt: message.createdAt,
                        text: message.text,
                        id: data.id,
                        fromUserId: parseInt(data.userId)
                    });
                    socket.broadcast.to(data.id.toString()).emit("CREATED_MESSAGE_STATUS")
                })

        });
        socket.on("LOAD_CHAT_ROOM", function (data) {
            MessageStatus.findOne({
                where: {
                    userId: data.user,
                    fromUserId: data.friend
                }
            }).then(function (messageStatus) {
                if (messageStatus) {
                    messageStatus.number = 0;
                    messageStatus.save().then(function () {
                        io.to(data.room.toString()).emit("STATUS_CHANGE", {
                            room: data.room
                        })
                    })
                }
            })
        });
        socket.on('OFFLINE', function (data) {
            User.findById(data.userId).then(function (user) {
                user.check = false;
                user.save().then(function () {
                    data.rooms.map(function (room) {
                        socket.broadcast.to(room).emit('UPDATE_USER_ONLINE');
                    })
                });
            })

        });
        socket.on('disconnect', function () {
            var id = user[socket.id];
            delete user[socket.id];

            User.findOne({
                where: {
                    id: id
                },
                include: [{
                    model: Friend,
                    as: "friends",
                    foreignKey: "userId"
                }]
            }).then(function (user) {
                if (user) {
                    user.check = false;
                    user.save().then(function () {
                        user.friends.map(function (friend) {
                            if (friend.check) {
                                socket.broadcast.to(friend.messageRoomId.toString()).emit('UPDATE_USER_ONLINE');
                            }
                        })
                    });
                }
            })
        })

    })
};
