const dotenv = require('dotenv');
dotenv.load();
const User = require('./app/db/model').User;
const Video = require('./app/db/model').Video;

var name = 'phan';
for(var i = 0; i < 50; i++){
    var user = User.build({
        name: name + i.toString(),
        email: name + i.toString() + "@gmail.com",
    });
    user.save();
    var video = Video.build({
        title: name + i.toString(),
        description: name + i.toString() + "@gmail.com",
        userId: 1,
        url: "http://res.cloudinary.com/du27rtoxp/video/upload/v1497276527/nkiaglhwwvxnsxykuhis.mp4"
    });
    video.save();
}
