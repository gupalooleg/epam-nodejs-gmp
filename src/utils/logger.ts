import { createLogger, format, transports } from 'winston';
import { LOG_LEVEL } from '../configs/config';

export const logger = createLogger({
  level: LOG_LEVEL,
  format: format.combine(
    format.timestamp({ format: 'ddd, DD MMM YYYY HH:mm:ss' }),
    format.printf(
      ({ timestamp, level, message }) => `[${timestamp}] ${level.toUpperCase()} ${message}`,
    ),
  ),
  transports: [new transports.Console()],
});
