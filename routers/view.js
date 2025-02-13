const express = require('express'), { view } = require('../controllers');
const router = express.Router();

// Route for home page
router.get('/', view.home);
// Route for vijece page
router.get('/vijece', view.vijece);
// Route for all news
router.get('/news', view.newsall);
// Router for individual news
router.get('/news/:id', view.news);

module.exports = router;