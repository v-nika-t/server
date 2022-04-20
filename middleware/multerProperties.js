const fs = require('fs');
const path = require('path');
const multer = require('multer');
const mkdir = path.resolve(__dirname + '/../assets/' + "test_files");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if( !fs.existsSync(mkdir) ) fs.mkdirSync(mkdir);
        cb(null, mkdir);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  module.exports = multer({ storage: storage })

