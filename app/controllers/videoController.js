

var videoController = {
    index: function (req, res) {
        res.render('video', {
            page: 'video'
        })
    }
};

module.exports = videoController;
