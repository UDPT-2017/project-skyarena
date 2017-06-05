const User = require('../db/model').User;

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
            req.session.postId = post.id;
            req.flash('info', 'Tao bai viet thanh cong');
            res.redirect('/');
          }).catch(function(e){
            req.flash('info', 'Nhập dữ liệu sai');
            res.redirect('/post/new');
          })
    },

};

module.exports = postController;
