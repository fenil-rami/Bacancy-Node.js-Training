/* eslint-disable func-names */
/* eslint-disable object-shorthand */
/* eslint-disable indent */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3030;

const upload = multer({
  storage: multer.diskStorage({
      destination: 'week4/uploads/',
      filename: function (req, file, cb) {
          const extension = path.extname(file.originalname);
          cb(null, crypto.randomUUID() + extension);
      },
  }),
});

app.post('/file/upload', upload.single('file'), (req, res) => {
  const fileName = req.file.filename;
  const fileId = Math.floor(Math.random() * 10000) + 1;

  fs.readFile(`${__dirname}/filenames.json`, 'utf-8', (err, filenames) => {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    }
    filenames = JSON.parse(filenames);
    filenames.push({ fileId, fileName, date: new Date() });
    fs.writeFile(`${__dirname}/filenames.json`, JSON.stringify(filenames), (error) => {
      if (error) {
        return res.status(500).json({
          error,
        });
      }
      return res.status(200).json({
        message: 'File has been uploaded successfully!',
        id: fileId,
      });
    });
  });
});

app.get('/file/:id', (req, res) => {
  const { id } = req.params;
  fs.readFile(`${__dirname}/filenames.json`, 'utf-8', (err, filenames) => {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    }

    filenames = JSON.parse(filenames);

    const fileName = filenames.filter((fl) => fl.fileId.toString() === id);

    const filePath = `${__dirname}/uploads/${fileName[0].fileName}`;

    if (fs.existsSync(filePath)) {
      const file = fs.createReadStream(filePath);
      file.pipe(res);
    } else {
      res.status(404).json({
        error: 'this file does not exists on server!',
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
