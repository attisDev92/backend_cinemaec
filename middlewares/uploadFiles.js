const multer = require('multer')
const path = require('path')

const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require('firebase/storage')
const { initializeApp } = require('firebase/app')

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    cb(null, true)
  },
  limits: { fileSize: 5 * 1024 * 1024 },
}).any()

const uploadFiles = async (req, res, next) => {
  const firebaseConfig = require('../utils/firebaseConfig')
  const app = initializeApp(firebaseConfig)
  const storage = getStorage(app)

  try {
    let posterUrl = ''
    let stillsUrls = []

    const uploadPromises = []

    for (const file of req.files) {
      const extension = path.extname(file.originalname)
      const fileRef = ref(
        storage,
        `cinemaec/${req.body.title.replace(' ', '_')}/${Date.now()}_${file.fieldname}${extension}`,
      )
      const uploadTask = uploadBytes(fileRef, file.buffer)

      uploadPromises.push(
        uploadTask.then(async snapshot => {
          const downloadURL = await getDownloadURL(snapshot.ref)

          if (file.fieldname === 'poster') {
            posterUrl = downloadURL
          }

          if (file.fieldname === 'stills') {
            stillsUrls.push(downloadURL)
          }
        }),
      )
    }

    await Promise.all(uploadPromises)

    if (posterUrl) req.body.poster = posterUrl
    if (stillsUrls.length > 0) req.body.stills = stillsUrls

    console.log(req.body)

    next()
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ error: 'Error uploading files', details: error.message })
  }
}

module.exports = {
  upload,
  uploadFiles,
}
