var musicController = {
    index: function (req, res) {
        res.render('musicBox', {
            page: 'musicBox'
        })
    }
};

module.exports = musicController;
