const { initializeApp } = require('firebase/app')
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} = require('firebase/storage')
const path = require('path')
const Movie = require('../models/Movie')

const firebaseConfig = require('../utils/firebaseConfig')
const app = initializeApp(firebaseConfig)
const storage = getStorage(app)

const updateMovieFiles = async (req, res) => {
  try {
    const { movieId } = req.body
    const movie = await Movie.findById(movieId)

    if (!movie) {
      return res.status(404).json({ error: 'Pelicula no encontrada' })
    }

    const file = req.files[0]
    const fileExtension = path.extname(file.originalname)
    const fileName = `cinemaec/${movie.title.replace(/ /g, '_')}/${file.fieldname}_${Date.now()}${fileExtension}`
    const storageRef = ref(storage, fileName)

    if (file.fieldname === 'poster') {
      if (movie.poster.url) {
        try {
          const oldPosterPath = movie.poster.url.split('/o/')[1].split('?')[0]
          const oldPosterRef = ref(storage, decodeURIComponent(oldPosterPath))
          await deleteObject(oldPosterRef)
        } catch (error) {
          console.error('Error al eliminar el póster antiguo:', error.message)
          return res
            .status(500)
            .json({ error: 'Error al eliminar el archivo antiguo' })
        }
      }

      const snapshot = await uploadBytes(storageRef, file.buffer)
      const downloadURL = await getDownloadURL(snapshot.ref)
      movie.poster.url = downloadURL
    }

    if (file.fieldname === 'stills') {
      if (movie.stills.length >= 5) {
        return res
          .status(400)
          .json({ error: 'Ya existe el número máximo de fotogramas' })
      }

      const snapshot = await uploadBytes(storageRef, file.buffer)
      const downloadURL = await getDownloadURL(snapshot.ref)
      movie.stills.push({ url: downloadURL })
    }

    await movie.save()
    res.status(200).json(movie)
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ error: 'Error uploading file', details: error.message })
  }
}

const deleteMovieFiles = async (req, res) => {
  //se busca el objeto movie
  //se busca el id de file en el movie poster
  //si se encuentra se elimina de firebase
  //se elimina de la base de datos
  //si no se encuentra se busca en poster
  //se elimina de firebase
  //se elimina de la base de datos
  //se envia guarda el modelo y se elimina
}

module.exports = {
  updateMovieFiles,
  deleteMovieFiles,
}
