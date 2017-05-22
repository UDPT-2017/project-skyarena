const Message = require("../app/db/model").Message;

module.exports = function (server) {
    var io = require('socket.io').listen(server);
    var room;
    io.sockets.on('connection', function (socket) {
        socket.on("join", function (data) {
            room = data.id;
            socket.join(room);
            console.log(`join ${room}`);
        });
        socket.on("new message", function (data) {
            var message = Message.build({});
            message.userId = parseInt(data.userId);
            message.text = data.text;
            message.messageRoomId = parseInt(room);
            message.save().then(function (message) {
                io.to(room).emit("create message", {
                    name: data.name,
                    avatar: data.avatar,
                    date : message.createdAt,
                    text: message.text
                })
            })
        })
        socket.on('disconnect', function () {
            console.log("disconnect");
            socket.leave(room);
            socket.disconnect();
        });

    })
};
