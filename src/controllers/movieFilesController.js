import { initializeApp } from 'firebase/app'
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage'
import path from 'path'
import Movie from '../models/Movie.js'
import { firebaseStorage } from '../config/config.js'

import firebaseConfig from '../config/firebaseConfig.js'
const app = initializeApp(firebaseConfig)
const storage = getStorage(app)

export const updateMovieFiles = async (req, res) => {
  try {
    const { movieId } = req.body
    const movie = await Movie.findById(movieId)

    if (!movie) {
      return res.status(404).json({ error: 'Pelicula no encontrada' })
    }

    const file = req.files[0]
    const fileExtension = path.extname(file.originalname)
    const fileName = `${firebaseStorage}/${movie.title.replace(/ /g, '_')}/${file.fieldname}_${Date.now()}${fileExtension}`
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

export const deleteMovieFiles = async (req, res) => {
  try {
    const { movieId, fileId } = req.body

    const movie = await Movie.findById(movieId)
    if (!movie) {
      res.status(404).json({ error: 'La película no existe' })
    }

    let fileDeleted = false

    if (
      movie.poster.url &&
      movie.poster.url.trim() !== '' &&
      movie.poster._id.toString() === fileId
    ) {
      try {
        const posterPath = movie.poster.url.split('/o/')[1].split('?')[0]
        const posterRef = ref(storage, decodeURIComponent(posterPath))
        await deleteObject(posterRef)
        movie.poster.url = ''
        fileDeleted = true
      } catch (error) {
        console.error('Error al eliminar el póster de Firebase:', error.message)
        return res
          .status(500)
          .json({ error: 'Error al eliminar el póster de Firebase' })
      }
    }

    const stillIndex = movie.stills.findIndex(
      still => still._id.toString() === fileId,
    )
    if (stillIndex !== -1) {
      try {
        const stillPath = movie.stills[stillIndex].url
          .split('/o/')[1]
          .split('?')[0]
        const stillRef = ref(storage, decodeURIComponent(stillPath))
        await deleteObject(stillRef)
        movie.stills.splice(stillIndex, 1)
        fileDeleted = true
      } catch (error) {
        console.error('Error al eliminar el still de Firebase:', error.message)
        return res
          .status(500)
          .json({ error: 'Error al eliminar el still de Firebase' })
      }
    }

    if (!fileDeleted) {
      return res
        .status(404)
        .json({ error: 'Archivo no encontrado en la película' })
    }

    await movie.save()
    res.status(200).json({ message: 'Archivo eliminado correctamente', movie })
  } catch (error) {
    console.error('Error al eliminar el archivo:', error)
    res
      .status(500)
      .json({ error: 'Error al eliminar el archivo', details: error.message })
  }
}
