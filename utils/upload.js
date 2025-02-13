const multer = require('multer');
const path = require('path');

const imageExts = ['apng', 'avif', 'png', 'webp', 'jpg', 'svg', 'gif', 'jpeg', 'jfif', 'pjpeg', 'pjp'];

const upload = multer({ 
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, `../public/uploads/${imageExts.find(e => e == path.extname(file.originalname).substring(1).toLowerCase()) ? 'img' : 'doc'}`));
    },
    filename: function (req, file, cb) {
      cb(null, path.basename(file.originalname, path.extname(file.originalname)) + path.extname(file.originalname).toLowerCase());
    }
  })
});

module.exports = upload;