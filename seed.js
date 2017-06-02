const dotenv = require('dotenv');
dotenv.load();
const User = require('./app/db/model').User;

var name = 'phan';
for(var i = 0; i < 50; i++){
    var user = User.build({
        name: name + i.toString(),
        email: name + i.toString() + "@gmail.com",
    });
    user.save();
}
