import { format } from 'date-fns';
import { NextFunction, Request, Response } from 'express';
import { AppError } from './appError';

export function errorHandler(err: any, request: Request, response: Response, _: NextFunction) {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      date: format(new Date(), 'dd/MM/yyyy HH:mm:ss'),
      status: err.type.toLowerCase(),
      message: err.message,
      type: err.type,
    });
  }

  return response.status(400).json({
    status: 'error',
    message: err.message,
  });
}
