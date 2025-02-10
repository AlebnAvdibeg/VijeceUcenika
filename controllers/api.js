const { database, regex } = require('../utils'), mongoose = require('mongoose');

module.exports = {
    news: (req, res) => {
        let query = (req.query.q ? regex.escapeRegex(req.query.q) : ''), offset = (req.query.o ? parseInt(req.query.o) : 0), limit = (req.query.l ? parseInt(req.query.l) : 10);
        database.news.find({ title: { $regex: query, $options: 'i' }}).skip(offset).limit(limit + 1).sort('-time').exec().then(news => {
            if(!news) return res.status(404).send();
            let data = {end: false, news};
            if(news.length <= limit) data.end = true;
            else data.news.pop();
            res.json(data);
        }).catch((err) => {
            console.error('Error adding news:', error);
            res.status(500).send('Server Error');
        });
    },
    addnews: (req, res) => {
        try {
            const { title, description, tag0, tag1, tag2, files, drive } = req.body;
            let images = req.files.map(file => file.filename);    
            if(!images.length) images = ['test.jpg'];
            let tags = '';
            if(tag0 == 'on') tags += '0';
            if(tag1 == 'on') tags += '1';
            if(tag2 == 'on') tags += '2';
            let time = new Date(), data = {title, description, images, tags, time, drive, date: `${time.getDate()} ${database.months[time.getMonth()]} ${time.getFullYear()}`};
            if(files && files.length) data.files = files; 
            database.news.findOneAndUpdate({_id: req.body?._id}, data, {upsert: true}).then(() => {
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