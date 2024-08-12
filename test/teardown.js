const mongoose = require('mongoose')

module.exports = async () => {
  process.exit(0)
  await mongoose.connection.close()
}
