const moviesInitialList = [
  {
    title: 'Mi película fantástica',
    director: 'Steven Spielberg',
    productionCompany: 'Amblin Entertainment',
    storyLine:
      'Una aventura épica llena de criaturas mágicas y un héroe inesperado.',
    plot: 'Un joven granjero descubre que es descendiente de una antigua línea de magos y debe enfrentarse a una poderosa fuerza del mal para salvar a su mundo.',
    poster: 'https://example.com/movie-poster.jpg',
    stills: [
      'https://example.com/still1.jpg',
      'https://example.com/still2.jpg',
    ],
    trailer: 'https://www.youtube.com/watch?v=trailer123',
    technicalTeam: [
      {
        name: 'John Doe',
        role: 'Guionista',
      },
      {
        name: 'Jane Smith',
        role: 'Director/a de fotografía',
      },
    ],
    cast: ['Chris Evans', 'Scarlett Johansson'],
    runTime: 120,
    genre: 'Ficción',
    sub_genre: ['Aventuras'],
    realeseYear: 2024,
    country: 'Estados Unidos',
    language: ['Inglés'],
    subtitles: ['Español'],
    target: '+12 años',
    festivals: ['Festival de Cine de Cannes'],
    awards: ['Nominada a Mejor Película de Animación'],
    funding: ['Comcast', 'Universal Pictures'],
    reaInformation: {
      available: true,
      territoryLicense: ['Latinoamérica', 'Europa'],
    },
    channels: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com/title/movie-id',
      },
      {
        platform: 'HBO Max',
        url: 'https://www.hbomax.com/es/movie/movie-id',
      },
    ],
    contact: {
      name: 'Juan Pérez',
      role: 'Relaciones Públicas',
      phone: '+1 234-567-890',
      mail: 'juan.perez@example.com',
    },
  },
]

const newMovieObject = {
  title: 'The Shawshank Redemption',
  director: 'Frank Darabont',
  productionCompany: 'Castle Rock Entertainment',
  storyLine:
    'Two imprisoned men forge an unlikely friendship over the course of many years.',
  plot: "Andy Dufresne, a banker wrongly convicted of murder, is sentenced to life imprisonment in Shawshank State Penitentiary. Over the years, he forms a close friendship with Red, a fellow inmate, and becomes the unofficial accountant for the prison. Andy's quiet determination and intelligence eventually lead him to escape from prison and regain his freedom.",
  poster:
    'https://m.media-amazon.com/images/M/MV5BMDUxZWE1YzEtZGFhYy00NDc3LTk2OTc0NDQ3ZTE3ZTMxMDc3._V1_.jpg',
  stills: [
    'https://m.media-amazon.com/images/M/MV5BMTA2NDc3Njg0NDVeQTJeQWpwZ15BbWU4MDc1NDcxNTUz._V1_.jpg',
    'https://m.media-amazon.com/images/M/MV5BMTA2NDc3Njg0NDVeQTJeQWpwZ15BbWU4MDc1NDcxNTUz._V1_.jpg',
  ],
  trailer: 'https://www.youtube.com/watch?v=6hB31N54PQE',
  technicalTeam: [
    {
      name: 'Stephen King',
      role: 'Guionista',
    },
  ],
  cast: ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton', 'William Sadler'],
  runTime: 142,
  genre: 'Ficción',
  sub_genre: ['Drama'],
  realeseYear: 1994,
  country: 'Estados Unidos',
  language: ['Inglés'],
  subtitles: [],
  target: '+18 años',
  festivals: ['Festival de Cannes'],
  awards: [
    'Premio de la Academia al Mejor Guión Adaptado',
    'Premio BAFTA al Mejor Guión Adaptado',
  ],
  funding: [],
  reaInformation: {
    available: true,
    expiration: '2025-12-31T00:00:00.000Z',
    territoryLicense: ['Estados Unidos', 'Canadá'],
  },
  channels: [
    {
      platform: 'Netflix',
      url: 'https://www.netflix.com/title/60036342',
    },
  ],
  contact: {
    name: 'John Doe',
    role: 'Distribuidor',
    phone: '+1234567890',
    mail: 'johndoe@example.com',
  },
  // created: '2024-08-28T14:00:49.491Z',
  // createdBy: '66bbc5aa53778c21f1309e89',
}

const invalidMovie = {
  title: '',
  director: 'David Smith',
  storyLine: 'Una historia de amor...',
  runTime: 0,
  genre: '',
  sub_genre: [],
  realeseYear: 2050,
  country: 'EEUU',
  language: [],
}

module.exports = {
  moviesInitialList,
  newMovieObject,
}
