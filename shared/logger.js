import winston, { format, transports } from 'winston'
import 'dotenv/config'

const commonOptions = {
  level: 'info',
  format: winston.format.combine(
    winston.format.printf(({ level, message }) => {
      return `[${level.toUpperCase()}]: ${message}`
    }),
  ),
}

// Using winston for local env
const localConfig = {
  transports: [new winston.transports.Console()],
}

const envLocation = process.env.NODE_ENV || ''

// Using winston-cloudwatch for production
const productionConfig = {
  transports: [
    new transports.Console({
      format: format.combine(format.simple(), format.colorize()),
    }),
  ],
}

const config = ['dev', 'staging', 'production'].includes(envLocation) ? productionConfig : localConfig

const logger = winston.createLogger({ ...commonOptions, ...config })
export { logger }
