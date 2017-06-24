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
  },
  getAswers: function(req, res) {
    try {
      Answer.findAll({
        where: {
          postID: parseInt(req.query.id)
        }
      }).then(answer => {
        Comment.findAll({
          where: {
            postID: parseInt(req.query.id)
          },
          include: [
            {
              model: User,
              as: "user"
            }
          ]
        }).then(function(answers) {
          if (answers === []) {
            res.send({
              success: true,
              comments: [],
              count
            });
          } else {
            answers.reverse();
            res.send({
              success: true,
              answers
            });
          }
        });
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.message
      });
    }
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
      var answer = Anser.build({
        text: req.body.text,
        userId: req.user.id,
        postID: req.post.id
      });
      answer
        .save()
        .then(function(answer) {
          return Answer.find({
            where: { id: answer.id },
            include: [{ model: User, as: "user" }]
          });
        })
        .then(function(answer) {
          res.send({
            success: true,
            answer: answer
          });
          return;
        });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.message
      });
    }
  }
};

module.exports = postController;
