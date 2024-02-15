const fsSync = require('fs');
const fs = require('fs/promises');

const filesPath = `${__dirname}/../filenames.json`;

exports.uploadFile = async (req, res) => {
  try {
    const fileName = req.file.filename;
    const fileId = Math.floor(Math.random() * 10000) + 1;

    let filenames = await fs.readFile(filesPath, 'utf-8');

    filenames = JSON.parse(filenames);
    filenames.push({ fileId, fileName, date: new Date() });

    await fs.writeFile(filesPath, JSON.stringify(filenames));

    return res.status(200).json({
      code: 200,
      message: 'File has been uploaded successfully!',
      data: {
        file: {
          id: fileId,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

exports.getFile = async (req, res) => {
  try {
    const { id } = req.params;
    let filenames = await fs.readFile(filesPath, 'utf-8');

    filenames = JSON.parse(filenames);

    const fileName = filenames.filter((fl) => fl.fileId.toString() === id);

    if (!fileName || fileName === undefined || fileName.length === 0) {
      return res.status(404).json({
        error: 'this file does not exists on server!',
      });
    }

    const filePath = `${__dirname}/../uploads/${fileName[0].fileName}`;

    if (fsSync.existsSync(filePath)) {
      const file = fsSync.createReadStream(filePath);
      file.pipe(res);
      return;
    }
    return res.status(404).json({
      error: 'this file does not exists on server!',
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};
