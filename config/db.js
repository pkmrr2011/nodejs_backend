import Sequelize from 'sequelize'
import dotenv from 'dotenv'
import { logger } from '../shared/logger'

dotenv.config()

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, String(process.env.DB_PASSWORD), {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false,
  define: {
    timestamps: true,
  },
})

async function testConnection() {
  try {
    await sequelize.authenticate()
    await sequelize.sync({ alter: true })
    logger.info('Connection has been established successfully.')
  } catch (error) {
    logger.error('Unable to connect to the database:', error.message)
  }
}

export { sequelize, testConnection }
