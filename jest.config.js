export default {
  preset: '@babel/preset-env', // Usa Babel para transformar el código
  testEnvironment: 'node',
  rootDir: 'src', // Asegúrate de que el directorio raíz sea 'src'
  extensionsToTreatAsEsm: ['.js'], // Indica que los archivos '.js' son ESM
  transform: {
    '^.+\\.js$': 'babel-jest', // Usa Babel para transformar los archivos JavaScript
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Asegúrate de que Jest cargue el archivo de configuración
}
