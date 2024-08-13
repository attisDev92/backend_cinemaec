const fs = require('fs')
const path = require('path')
const multer = require('multer')

const upload = multer({ dest: 'uploads/' })

const uploadToOneDrive = async(accesToken, filePath, fileName) => {
  const stream = fs.createReadStream(filePath)
  const response = await axios.put(
    
  )
}