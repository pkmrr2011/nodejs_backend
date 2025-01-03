import winston, { format, transports } from 'winston'
import LokiTransport from 'winston-loki'
import 'dotenv/config'

const commonOptions = {
  level: 'info',
  format: winston.format.combine(
    winston.format.printf(({ level, message }) => {
      return `[${level.toUpperCase()}]: ${message}`
    }),
  ),
}

let config = {
  transports: [new winston.transports.Console()],
}

const envLocation = process.env.NODE_ENV || ''

if (['PROD', 'STAGE'].includes(envLocation)) {
  config = {
    transports: [
      new LokiTransport({
        host: process.env.LOKI_HOST,
        labels: { app: process.env.LOKI_APP_NAME || `assignment_${envLocation}` },
        json: true,
        format: format.json(),
        replaceTimestamp: true,
        onConnectionError: (err) => logger.error(err),
      }),
      new transports.Console({
        format: format.combine(format.simple(), format.colorize()),
      }),
    ],
  }
}

const logger = winston.createLogger({ ...commonOptions, ...config })
export { logger }
