multer = require("multer");

// File upload settings
const PATH = './uploads';
  let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, PATH);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

  let upload = multer({
    storage: storage,
  });



  
module.exports = {
upload
}