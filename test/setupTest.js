const mongoose = require('mongoose')

beforeAll(async () => {
  // Connect to MongoDB Memory Server (replace with your connection details if not using memory server)
  await mongoose.connect('mongodb://localhost:27017/your-test-database-name', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
