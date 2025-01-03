import express from 'express'
import requestLogger from './middlewares/requestLogger.js'
import dashboardRoutes from './routes/dashboard.js'
import userRoutes from './routes/user.js'

const createServer = () => {
  const app = express()

  app.use(express.json({ limit: '60mb' }))
  app.use(express.urlencoded({ extended: true }))

  app.use(requestLogger)
  app.use('/dashboard', dashboardRoutes)
  app.use('/user', userRoutes)

  app.get('/', async (_req, res) => {
    return res.status(200).send({
      success: true,
      message: 'The server is running',
    })
  })

  app.use('*', async (_req, res) => {
    return res.status(404).send({
      success: false,
      message: 'URL_NOT_FOUND',
    })
  })

  return app
}

export default createServer
