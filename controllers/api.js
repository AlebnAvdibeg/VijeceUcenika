const { database, regex } = require('../utils'), mongoose = require('mongoose'), path = require('path');

function fileSize(size) {
    var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
    return +((size / Math.pow(1024, i)).toFixed(2)) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
}

module.exports = {
    news: (req, res) => {
        let query = (req.query.q ? regex.escapeRegex(req.query.q) : ''), offset = (req.query.o ? parseInt(req.query.o) : 0), limit = (req.query.l ? parseInt(req.query.l) : 10);
        database.news.find({ title: { $regex: query, $options: 'i' } }).skip(offset).limit(limit + 1).sort('-time').exec().then(news => {
            if (!news) return res.status(404).send();
            let data = { end: false, news };
            if (news.length <= limit) data.end = true;
            else data.news.pop();
            res.json(data);
        }).catch((err) => {
            console.error('Error adding news:', error);
            res.status(500).send('Server Error');
        });
    },
    addnews: (req, res) => {
        try {
            const { title, description, tag0, tag1, tag2 } = req.body;
            let images = ['/images/test.jpg'], files = [];
            if (req.files.images) images = req.files.images.map(file => `/uploads/img/${file.filename}`);
            if (req.files.files) files = req.files.files.map(file => ({ name: file.filename, size: fileSize(file.size) }));
            let tags = '';
            if (tag0 == 'on') tags += '0';
            if (tag1 == 'on') tags += '1';
            if (tag2 == 'on') tags += '2';
            let time = new Date();
            let data = { title, description, images, files, tags, time, date: `${time.getDate()} ${database.months[time.getMonth()]} ${time.getFullYear()}` };
            database.news.create(data).then(() => {
                return res.send("Ok");
            }).catch((err) => {
                console.log(err, err.message)
                return res.send("Fail");
            });
        } catch (error) {
            console.error('Error adding news:', error);
            res.status(500).send('Server Error');
        }
    },
    updatenews: (req, res) => {
        try {
            const { title, description, tag0, tag1, tag2 } = req.body;
            let images = ['/images/test.jpg'], files = [];
            if (req.files.images) images = req.files.images.map(file => `/uploads/img/${file.filename}`);
            if (req.files.files) files = req.files.files.map(file => ({ name: file.filename, size: fileSize(file.size) }));
            let tags = '';
            if (tag0 == 'on') tags += '0';
            if (tag1 == 'on') tags += '1';
            if (tag2 == 'on') tags += '2';
            let data = { title, description, tags };
            if(Number(req.query.h[0])) data.images = images;
            if(Number(req.query.h[1])) data.files = files;
            database.news.findOneAndUpdate({ _id: req.body._id }, data).then(() => {
                return res.send("Ok");
            }).catch((err) => {
                console.log(err, err.message)
                return res.send("Fail");
            });
        } catch (error) {
            console.error('Error adding news:', error);
            res.status(500).send('Server Error');
        }
    },
    delnews: (req, res) => {
        try {
            database.news.findByIdAndDelete(req.body._id).then(() => {
                return res.send("Ok");
            }).catch((err) => {
                return res.send("Fail");
            });
        } catch (error) {
            console.error('Error adding news:', error);
            res.status(500).send('Server Error');
        }
    },
}