import multer from "multer"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public"); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Append timestamp to avoid duplicate names
  }
});

const upload = multer({ storage });

export default upload;
