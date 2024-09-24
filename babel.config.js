module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current', // Transpila el código para el entorno actual de Node.js
        },
      },
    ],
  ],
}
