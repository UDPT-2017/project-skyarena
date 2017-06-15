var videoController = {
  index: function(req, res) {
    var premium;
    req.user.premium && req.user.premium >= new Date()
      ? (premium = true)
      : (premium = false);
    res.render("video", {
      page: "video",
      premium
    });
  }
};

module.exports = videoController;
