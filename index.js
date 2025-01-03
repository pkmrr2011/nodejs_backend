import dotenv from 'dotenv'
import { logger } from './shared/logger.js'
import createServer from './app.js'
import { connectDb } from './config/db.js'

dotenv.config()

const port = process.env.PORT || ''

const app = createServer()

try {
  app.listen(port, async () => {
    logger.info(`Connected successfully on port ${port}`)
    await connectDb()
  })
} catch (error) {
  logger.error(`Error occured: ${error.message}`)
}
