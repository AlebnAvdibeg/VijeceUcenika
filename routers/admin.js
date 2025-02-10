const express = require('express'), admin = require('../controllers').admin;
const router = express.Router();

//
router.get('/login', admin.login);
router.post('/login', admin.plogin);
router.get('/admin', admin.home);
router.get('/admin/logout', admin.logout);

module.exports = router;