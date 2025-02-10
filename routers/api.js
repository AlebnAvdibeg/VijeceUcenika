const express = require('express'), { api } = require('../controllers'), { upload } = require('../utils');
const router = express.Router();

// Route for searching news
router.get('/api/news', api.news);
// Route for adding news
router.post('/admin/api/addnews', upload.array('images', 10), api.addnews);
// Route for deleting news
router.post('/admin/api/delnews', api.delnews);

module.exports = router;