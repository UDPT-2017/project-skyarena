var Router = require("express").Router;
var controllers = require("../app/controllers");
const multipart = require("connect-multiparty");
const passport = require("../config/passport");
const Authentication = require("../config/authencation");
const multipartMiddleware = multipart();


module.exports = function(app) {
  var indexRouter = Router().get("/", controllers.index.index);
  var userRouter = Router()
    .get("/login", controllers.user.loadLogin)
    .get("/register", controllers.user.loadRegister)
    .post("/register", multipartMiddleware, controllers.user.register)
    .post(
      "/login",
      passport.authenticate("local", {
        failureRedirect: "/user/login",
        failureFlash: true
      }),
      controllers.user.login
    )
    .post("/logout", controllers.user.logout)
    .get(
      "/login/facebook/callback",
      passport.authenticate("facebook", {
        failureRedirect: "/login",
        scope: ["email"]
      }),
      controllers.user.loginFacebook
    )
    .get("/login/facebook", passport.authenticate("facebook"))
    .get(
      "/login/google/callback",
      passport.authenticate("google", {
        failureRedirect: "/login"
      }),
      controllers.user.loginGoogle
    )
    .get("/login/google", passport.authenticate("google"))
    .post("/edit", multipartMiddleware, controllers.user.update)
    .get("/premium", controllers.user.addPremium)
    .get("/edit", controllers.user.edit);
  app.use("/user", userRouter);
  var aboutRouter = Router().get("/", controllers.about.index);
  var friendRouter = Router()
    .get("/add", controllers.friend.addFriend)
    .get("/remove", controllers.friend.removeFriend)
    .get("/get", controllers.friend.getFriend)
    .get("/accept", controllers.friend.acceptFriend)
    .get("/count", controllers.friend.getCount)
    .get("/", controllers.friend.index);
  var messageRouter = Router()
    .get("/", controllers.message.index)
    .get("/get", controllers.message.getAllFriend)
    .get("/status", controllers.message.getStatus)
    .get("/online", controllers.message.getFriendStatus)
    .get("/:id", controllers.message.chatRoom);
  var videoRouter = Router().get("/*", controllers.video.index);
  var videoAPIRouter = Router()
    .get("/", controllers.videoAPI.index)
    .get("/watch", controllers.videoAPI.viewVideo)
    .get("/rating", controllers.videoAPI.getRating)
    .post("/new", multipartMiddleware, controllers.videoAPI.postViddeo)
    .get("/like", controllers.videoAPI.like)
    .get("/comments", controllers.videoAPI.getComments)
    .post("/postComment", controllers.videoAPI.addComment)
    .get("/your", controllers.videoAPI.getYourVideo)
    .get("/dislike", controllers.videoAPI.dislike);
  var postRouter = Router()
    .get("/", controllers.post.index)
    .get("/new", controllers.post.loadPost)
    .post("/new", controllers.post.createPost);
  var merchantRouter = Router()
       // .get('/register', controllers.merchant.loadRegister)
        .post('/register', multipartMiddleware, controllers.merchant.register)
        .get('/', controllers.merchant.index)
        .get('/get', controllers.item.getItem)
        .post('/add',multipartMiddleware, controllers.item.addItem)
        .get('/remove', controllers.item.removeItem);
        .get('/add', controllers.item.loadAdd)


  app.use("/", indexRouter);
  app.use("/user", userRouter);
  app.use("/about", Authentication, aboutRouter);
  app.use("/friend", Authentication, friendRouter);
  app.use("/message", Authentication, messageRouter);
  app.use("/video", Authentication, videoRouter);
  app.use("/post", Authentication, postRouter);
  app.use("/videoAPI", Authentication, videoAPIRouter);
  app.use('/merchant', Authentication, merchantRouter);

};
