import multer from 'multer'

const uploadTempFiles = multer({
  storage: multer.memoryStorage(),
  fileFilter: (_req, _file, cb) => {
    cb(null, true)
  },
  limits: { fileSize: 5 * 1024 * 1024 },
})

export default uploadTempFiles
