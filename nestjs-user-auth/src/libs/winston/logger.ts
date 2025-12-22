/* eslint-disable @typescript-eslint/no-explicit-any */
import * as winston from 'winston';

export const logger: winston.Logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/info.log', level: 'info' }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

export function logInfo(message: string, metaData: Record<string, any> = {}) {
  logger.info(message, metaData);
}

export function logError(message: string, metaData: Record<string, any> = {}) {
  logger.error(message, metaData);
}
