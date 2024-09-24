import app from './app.js'
import { PORT } from './config/config.js'
import { info } from './utils/logger.js'

import './config/db.js'

app.listen(PORT, () => {
  info(`server running on port ${PORT}`)
})
