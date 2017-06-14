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
    getPost: function (req, res) {
        var postList = [];
        var offset = req.query.page ;
        var query = req.query.query;
        Post.findAll({
            where: {
                postId: req.post.id
            }
        }).then(function (posts) {
            posts.forEach(function (post) {
              postList.push({
                  id: post.id,
                  title: post.title,
                  content: post.content
              });
            });
        });
    }

};

module.exports = postController;
