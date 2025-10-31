export class AppError {
  message: string;
  statusCode: number;
  type: string;

  constructor(message: string | any, statusCode = 400, type = 'ERROR') {
    this.message = typeof message === 'string' ? message : message.message;
    this.statusCode = statusCode;
    this.type = type;
  }
}
