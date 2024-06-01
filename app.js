/* eslint-disable no-unused-vars */
import express from 'express'
import testRoutes from './routes/test'

const createServer = () => {
  const app = express()

  app.use(express.json({ limit: '60mb' }))
  app.use(express.urlencoded({ extended: true }))

  app.use('/test', testRoutes)

  app.get('/', async (req, res) => {
    return res.status(200).send({
      success: true,
      message: 'The server is running',
    })
  })

  app.get('/health', async (req, res) => {
    return res.status(200).send({
      success: true,
      message: 'The server is running',
    })
  })

  app.use('*', async (req, res) => {
    return res.status(404).send({
      success: false,
      message: 'URL_NOT_FOUND',
    })
  })

  return app
}

export default createServer
