import request from 'supertest'
import app from '../../src/app'
import Movie from '../../src/models/Movie'
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage'

jest.mock('firebase/storage', () => ({
  getStorage: jest.fn(),
  ref: jest.fn(),
  uploadBytes: jest.fn(),
  getDownloadURL: jest.fn(),
  deleteObject: jest.fn(),
}))

jest.mock('../../src/models/Movie')

describe('Test movie file upload endpoint', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Debe subir un archivo de póster correctamente', async () => {
    const mockMovie = {
      _id: 'movieId123',
      title: 'Test Movie',
      poster: { url: '' },
      save: jest.fn(),
    }
    Movie.findById.mockResolvedValue(mockMovie)

    uploadBytes.mockResolvedValue({ ref: 'mockRef' })
    getDownloadURL.mockResolvedValue('https://fakeurl.com/poster123')

    const response = await request(app)
      .post('/api/movies/files/update')
      .field('movieId', 'movieId123')
      .attach('poster', Buffer.from('file content'), 'test-poster.jpg')

    expect(response.statusCode).toBe(200)
    expect(mockMovie.save).toHaveBeenCalled()
    expect(uploadBytes).toHaveBeenCalledWith(
      expect.any(Object),
      expect.any(Buffer),
    )
    expect(getDownloadURL).toHaveBeenCalledWith('mockRef')
    expect(mockMovie.poster.url).toBe('https://fakeurl.com/poster123')
  })

  describe('Test movie file delete endpoint', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    test('Debe eliminar un póster correctamente', async () => {
      // Mockear una película con un póster
      const mockMovie = {
        _id: 'movieId123',
        title: 'Test Movie',
        poster: {
          _id: 'posterId123',
          url: 'https://fakeurl.com/o/poster123?token=abc',
        },
        stills: [],
        save: jest.fn(),
      }
      Movie.findById.mockResolvedValue(mockMovie)

      deleteObject.mockResolvedValue()

      const response = await request(app)
        .post('/api/movies/files/delete') // Ajusta la ruta según tu API
        .send({ movieId: 'movieId123', fileId: 'posterId123' })

      expect(response.statusCode).toBe(200)
      expect(deleteObject).toHaveBeenCalledWith(expect.any(Object))
      expect(mockMovie.poster.url).toBe('')
      expect(mockMovie.save).toHaveBeenCalled()
    })

    test('Debe eliminar un still correctamente', async () => {
      // Mockear una película con un still
      const mockMovie = {
        _id: 'movieId123',
        title: 'Test Movie',
        poster: { url: '' },
        stills: [
          {
            _id: 'stillId123',
            url: 'https://fakeurl.com/o/still123?token=abc',
          },
        ],
        save: jest.fn(),
      }
      Movie.findById.mockResolvedValue(mockMovie)

      deleteObject.mockResolvedValue()

      const response = await request(app)
        .post('/api/movies/files/delete')
        .send({ movieId: 'movieId123', fileId: 'stillId123' })

      expect(response.statusCode).toBe(200)
      expect(deleteObject).toHaveBeenCalledWith(expect.any(Object))
      expect(mockMovie.stills.length).toBe(0) // Asegurarse que se eliminó el still
      expect(mockMovie.save).toHaveBeenCalled()
    })
  })
})
