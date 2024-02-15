const multer = require('multer');
const path = require('path');

const upload = multer({
  storage: multer.diskStorage({
    destination: 'uploads/',
    filename(req, file, cb) {
      const extension = path.extname(file.originalname);
      cb(null, crypto.randomUUID() + extension);
    },
  }),
});

module.exports = { upload };
