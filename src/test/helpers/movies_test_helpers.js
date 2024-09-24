// import Movie from '../../models/Movie'
// import { createAdmin } from './admin_test_helpers'
// import { moviesInitialList } from './data_helpers'

// const initMovies = async () => {
//   const admin = await createAdmin()
//   for (let movie of moviesInitialList) {
//     const movieObject = new Movie({ ...movie, createdBy: admin.id })
//     await movieObject.save()
//   }
// }

// const getMovies = async () => {
//   return await Movie.find({})
// }

// export default {
//   initMovies,
//   getMovies,
// }
