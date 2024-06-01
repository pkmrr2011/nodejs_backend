import dotenv from 'dotenv'
import { logger } from './shared/logger'
import createServer from './app'

dotenv.config()

const port = process.env.PORT || ''

const app = createServer()

try {
  app.listen(port, () => {
    logger.info(`Connected successfully on port ${port}`)
  })
} catch (error) {
  logger.error(`Error occured: ${error.message}`)
}
