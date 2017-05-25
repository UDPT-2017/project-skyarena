const Message = require("../app/db/model").Message;

module.exports = function (server) {
    var io = require('socket.io').listen(server);
    var room;
    io.sockets.on('connection', function (socket) {
        socket.on("join", function (data) {
            room = data.id;
            socket.join(room);
        });
        socket.on("new message", function (data) {
            var message = Message.build({});
            message.userId = parseInt(data.userId);
            message.text = data.text;
            message.messageRoomId = data.id;
            message.save().then(function (message) {
                io.to(data.id.toString()).emit("create message", {
                    name: data.name,
                    avatar: data.avatar,
                    createdAt : message.createdAt,
                    text: message.text,
                    id: data.id
                })
            })
        });
        socket.on('disconnect', function () {
            console.log("disconnect");
            socket.leave(room);
            socket.disconnect();
        });

    })
};
