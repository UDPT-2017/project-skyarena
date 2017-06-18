const User = require("../db/model").User;
const Post = require("../db/model").Post;

var postController = {
  index: function(req, res) {
    Post.findAll({}).then(function(posts) {
      res.render("post", {
        page: "post",
        posts
      });
    });
  },
  loadPost: function(req, res) {
    res.render("post/new",{
      page: "post"
    });
  },
  createPost: function(req, res) {
    var post = Post.build({});
    post.title = req.body.title;
    post.content = req.body.content;
    post.userId = req.user.id;
    post
      .save()
      .then(function(post) {
        req.flash("info", "Tao bai viet thanh cong");
        res.redirect("/post/");
      })
      .catch(function(e) {
        req.flash("info", "Nhập dữ liệu sai");
        res.redirect("/post/new");
      });
  },
  getPost: function(req, res) {
    Post.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(post) {
      res.render("post/show", {
        page: "post",
        post: post
      });
    });
  }
};

module.exports = postController;
