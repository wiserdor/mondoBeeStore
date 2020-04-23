var multer = require("multer");

const storageA = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./build/images");
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, file.originalname); // here we specify the file saving name . in this case i specified the original file name
  },
});

const storageB = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, file.originalname); // here we specify the file saving name . in this case i specified the original file name
  },
});

const destA = multer({ storage: storageA });
const destB = multer({ storage: storageB });

exports.fileUpload = (req, res, next) => {
    console.log("Uploading file")
  destA.single("file")(req, res, next);
  destB.single("file")(req, res, next);
  next();
};
