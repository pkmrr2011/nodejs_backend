import dotenv from 'dotenv'
import { logger } from './shared/logger'
import createServer from './app'
import { testConnection } from './config/db'

dotenv.config()

const port = process.env.PORT || ''

const app = createServer()

try {
  app.listen(port, async () => {
    logger.info(`Connected successfully on port ${port}`)
    await testConnection()
  })
} catch (error) {
  logger.error(`Error occured: ${error.message}`)
}
