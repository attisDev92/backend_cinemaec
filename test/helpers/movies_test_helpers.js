import Movie from '../../src/models/Movie'
import { postAdmin } from './admin_test_helpers'
import { newAdmin } from './admin_test_helpers'
import { initialMoviesList } from './movieData_helpers'

export const fetchInitMovies = async () => {
  const admin = await postAdmin(newAdmin)

  for (const movie of initialMoviesList) {
    const movieCreated = new Movie({ ...movie, createdBy: admin.id })
    await movieCreated.save()
  }

  const movies = await Movie.find({})
  return movies
}

export const getMovies = async () => {
  const movies = await Movie.find({})
  return movies
}
