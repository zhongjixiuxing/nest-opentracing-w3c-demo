/* eslint-disable @typescript-eslint/no-var-requires */
const winston = require('winston')
const LokiTransport = require('winston-loki')
import * as appPackage from '../../../package.json'
import { config } from '@app/config'
const { combine, prettyPrint } = winston.format

export const logger = winston.createLogger({
  level: 'info',
  format: combine(
    // label({}),
    winston.format.json(),
    prettyPrint(),
    // winston.format.colorize(),
  ),
  defaultMeta: {},
})

logger.add(
  new LokiTransport({
    host: config.loki.host,
    json: true,
    labels: { __app: config.app.name, __version: appPackage.version },
    handleExceptions: true,
  }),
)

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.json(),
      level: config.loki.level,
      handleExceptions: true,
    }),
  )
}

export default logger
export * from './ot.logger'
