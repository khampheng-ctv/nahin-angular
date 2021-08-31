const path = require('path');
const multer = require("multer");
const { v4: uuidv4 } = require('uuid');

const singleUpload = (dest, fieldname) => {
  return multer({
    storage: multer.diskStorage({
      destination: path.join(__dirname, dest),
      filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname));
      },
    }),
  }).single(fieldname);
};

module.exports = { singleUpload };