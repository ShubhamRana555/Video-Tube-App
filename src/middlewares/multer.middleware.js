import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp")
  },
  filename: function (req, file, cb) {
    
    cb(null, file.originalname)   // originalname is not a good name for a file to store in server, but we are using it cause file will be in local server for fraction of seconds, so no worry for small projects
  }
})

export const upload = multer({ storage: storage })
