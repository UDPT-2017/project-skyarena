const Video = require("../db/model").Video;
const User = require("../db/model").User;
const Rating = require("../db/model").Rating;
const Comment = require("../db/model").Comment;
const cloudinary = require("../../config/cloudinary");
const _ = require("lodash");

var videoAPIController = {
  index: function(req, res) {
    var queryObj = {};
    if (req.query.query && req.query.query !== "") {
      queryObj.where = {
        title: {
          $like: req.query.query
        }
      };
    }
    Video.findAndCount(queryObj).then(function(result) {
      queryObj.limit = 8;
      if (req.query.page) {
        queryObj.offset = req.query.page * 8;
      }
      console.log(queryObj);
      Video.findAll(queryObj).then(function(lists) {
        res.send({
          count: result.count,
          lists
        });
      });
    });
  },
  postViddeo: function(req, res) {
    try {
      if (!req.user) {
        res.send({
          success: false,
          message: "need to login"
        });
        return;
      }
      if (!req.files.video) {
        res.send({
          success: false,
          message: "need to upload an video"
        });
        return;
      }
      cloudinary.uploader.upload(
        req.files.video.path,
        function(result) {
          console.log(result);
          if (!result.url) {
            res.send({
              success: false,
              message: "need to upload an video"
            });
            return;
          }
          var body = _.pick(req.body, ["title", "description"]);
          if (body.title === "" || body.description === "") {
            res.send({
              success: false,
              message: "need a title and a description"
            });
            return;
          }
          var video = Video.build(body);
          video.url = result.url;
          video.userId = req.user.id;
          video
            .save()
            .then(() => {
              res.send({
                success: true
              });
              return;
            })
            .catch(err => {
              console.log(err);
              res.send({
                success: false,
                message: "something went wrong"
              });
            });
        },
        { resource_type: "video" }
      );
    } catch (e) {
      res.send({
        success: false,
        message: "something went wrong"
      });
    }
  },
  viewVideo: function(req, res) {
    try {
      if (!req.query.id) {
        res.status(404).send({
          success: false,
          message: "No video found"
        });
        return;
      }
      Video.findOne({
        where: {
          id: req.query.id
        },
        include: [
          {
            model: User,
            as: "user"
          }
        ]
      }).then(video => {
        if (video) {
          res.send({
            success: true,
            video
          });
          return;
        }
        res.status(404).send({
          success: false,
          message: "No video found"
        });
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.message
      });
    }
  },
  getRating: function(req, res) {
    try {
      if (!req.user) {
        res.status(404).send({
          success: false,
          message: "need to login"
        });
        return;
      }
      if (!req.query.id) {
        res.status(404).send({
          success: false,
          message: "No video found"
        });
        return;
      }
      Rating.findOne({
        where: {
          userId: req.user.id,
          videoId: req.query.id
        }
      }).then(function(rating) {
        if (rating) {
          res.send({
            success: true,
            like: rating.like
          });
          return;
        }
        res.send({
          success: false
        });
        return;
      });
    } catch (e) {
      res.status(500).send({
        success: false,
        message: err.message
      });
    }
  },
  like: function(req, res) {
    try {
      if (!req.user) {
        res.status(404).send({
          success: false,
          message: "need to login"
        });
        return;
      }
      if (!req.query.id) {
        res.status(404).send({
          success: false,
          message: "No video found"
        });
        return;
      }
      Video.findById(req.query.id).then(function(video) {
        if (!video) {
          res.status(404).send({
            success: false,
            message: "No video found"
          });
          return;
        }
        Rating.findOne({
          where: {
            userId: req.user.id,
            videoId: req.query.id
          }
        })
          .then(function(rating) {
            if (!rating) {
              var rating = Rating.build({
                like: true,
                videoId: req.query.id,
                userId: req.user.id
              });
              video.like++;
              return rating.save();
            }
            if (!rating.like) {
              rating.like = true;
              video.like++;
              video.dislike--;
              return rating.save();
            }
            res.send({
              success: true,
              like: video.like,
              dislike: video.dislike
            });
          })
          .then(function() {
            return video.save();
          })
          .then(function() {
            res.send({
              success: true,
              like: video.like,
              dislike: video.dislike
            });
          });
      });
    } catch (e) {
      res.status(500).send({
        success: false,
        message: err.message
      });
    }
  },
  dislike: function(req, res) {
    try {
      if (!req.user) {
        res.status(404).send({
          success: false,
          message: "need to login"
        });
        return;
      }
      if (!req.query.id) {
        res.status(404).send({
          success: false,
          message: "No video found"
        });
        return;
      }
      Video.findById(req.query.id).then(function(video) {
        if (!video) {
          res.status(404).send({
            success: false,
            message: "No video found"
          });
          return;
        }
        Rating.findOne({
          where: {
            userId: req.user.id,
            videoId: req.query.id
          }
        })
          .then(function(rating) {
            if (!rating) {
              var rating = Rating.build({
                like: false,
                videoId: req.query.id,
                userId: req.user.id
              });
              video.dislike++;
              return rating.save();
            }
            if (rating.like) {
              rating.like = false;
              video.dislike++;
              video.like--;
              return rating.save();
            }
            res.send({
              success: true,
              like: video.like,
              dislike: video.dislike
            });
          })
          .then(function() {
            return video.save();
          })
          .then(function() {
            res.send({
              success: true,
              like: video.like,
              dislike: video.dislike
            });
          });
      });
    } catch (e) {
      res.status(500).send({
        success: false,
        message: err.message
      });
    }
  },
  getComments: function(req, res) {
    try {
      if (!req.query.id) {
        res.status(404).send({
          success: false,
          message: "No video found"
        });
        return;
      }
      Comment.findAll({
        where: {
          videoId: parseInt(req.query.id)
        },
        include: [
          {
            model: User,
            as: "user"
          }
        ]
      }).then(function(comments) {
        if (comments === "") {
          res.send({
            success: true,
            comments: []
          });
        } else {
          comments.reverse();
          res.send({
            success: true,
            comments
          });
        }
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.message
      });
    }
  },
  addComment: function(req, res) {
    try {
      console.log(req.body);
      if (!req.body.id) {
        res.status(404).send({
          success: false,
          message: "No video found"
        });
        return;
      }
      if (!req.user) {
        res.status(404).send({
          success: false,
          message: "Need to login"
        });
        return;
      }
      var comment = Comment.build({
        text: req.body.text,
        userId: req.user.id,
        videoId: req.body.id
      });
      comment
        .save()
        .then(function(comment) {
          return Comment.find({
            where: { id: comment.id },
            include: [{ model: User, as: "user" }]
          });
        })
        .then(function(comment) {
          res.send({
            success: true,
            comment: comment
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

module.exports = videoAPIController;
