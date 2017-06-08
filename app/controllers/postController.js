const User = require('../db/model').User;
const Post = require('../db/model').Post;

var postController = {
    index: function (req, res) {
        res.render('post', {
            page: 'post'
        })
    },
    loadPost: function(req, res) {
        res.render('post/new')
    },
    createPost: function(req, res) {
        var post = Post.build({});
        post.title = req.body.title;
        post.content = req.body.content;
        post.save().then(function(post){
            req.flash('info', 'Tao bai viet thanh cong');
            res.redirect('/post/');
          }).catch(function(e){
            req.flash('info', 'Nhập dữ liệu sai');
            res.redirect('/post/new');
          })
    },

};

module.exports = postController;
