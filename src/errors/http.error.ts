import { AppError } from './app.error';

export class HttpError extends AppError {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);

    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}
