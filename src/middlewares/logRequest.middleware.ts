import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export function logRequestMiddleware(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();

  res.on('close', () => {
    const duration = Date.now() - start;
    logger.info(`${req.method} ${req.originalUrl} - ${duration}ms`);
  });

  next();
}
