const express = require('express');
const { upload } = require('../config/multer');
const { uploadFile, getFile } = require('../controllers/files');

const Router = express.Router();

Router.post('/api/v1/file', upload.single('file'), uploadFile);
Router.get('/api/v1/file/:id', getFile);

module.exports = { Router };
