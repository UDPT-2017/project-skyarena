const User = require("../db/model").User;
const Post = require("../db/model").Post;
const Answer = require('../db/model').Answer;

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
      },
      include: [{
        model: Answer,
        as: 'answers',
        include: [{
          model: User,
          as: 'user'
        }]
      }
      ]
    }).then(function(post) {
      res.render("post/show", {
        page: "post",
        post: post
      });
    });
  },
  addAnswer: function(req, res) {
    try {
      console.log(req.body);
      if (!req.user) {
        res.status(404).send({
          success: false,
          message: "Need to login"
        });
        return;
      }
      var answer = Answer.build({
        text: req.body.text,
        userId: req.user.id,
        postID: req.params.id
      });
      answer
        .save()
        .then(function(answer) {
          res.redirect(`/post/${req.params.id}`)
        })
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.message
      });
    }
  }
};

module.exports = postController;
