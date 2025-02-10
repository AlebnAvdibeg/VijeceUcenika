const { database, regex } = require('../utils'), mongoose = require('mongoose');

module.exports = {
    home: (req, res) => {
        database.news.find({}).limit(3).sort('-time').exec()
            .then(news => {
                res.render('home', { news })
            });
    },
    vijece: (req, res) => {
        res.render('vijece', { });
    },
    clanovi: (req, res) => {
        res.sendFile('clanovi.html', { root: './public/html' });
    },
    newsall: (req, res) => {
        let query = (req.query.q ? regex.escapeRegex(req.query.q) : ''), limit = (req.query.l ? parseInt(req.query.l) : 3);
        database.news.find({ title: { $regex: query, $options: 'i' }}).limit(limit).sort('-time').exec()
            .then(news => res.render('newsall', { news }));
    },
    news: (req, res) => {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(404).sendFile('404news.html', { root: './public/html' });
        database.news.findById(req.params.id).then(news => {
            if(!news) return res.status(404).sendFile('404news.html', { root: './public/html' });
            database.news.find({}).limit(3).sort('-time').exec()
                .then(newss => {
                    if(!newss) return res.status(404).sendFile('404news.html', { root: './public/html' });
                    res.render('news', { news, newss });
                });
        });
    }
}