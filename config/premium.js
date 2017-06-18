var Premium = function(req, res, next) {
  if (req.user.premium && req.user.premium >= new Date()) {
    next();
  } else {
    req.flash("info", "need to login");
    res.send({
      success: false,
      message: "need to login"
    });
  }
};

module.exports = Premium;
