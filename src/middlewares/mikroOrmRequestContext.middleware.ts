import { Request, Response, NextFunction } from 'express';
import { RequestContext } from '@mikro-orm/core';
import { DI } from '../db';

export function mikroOrmRequestContextMiddleware(req: Request, res: Response, next: NextFunction) {
  return RequestContext.create(DI.orm.em, next);
}
