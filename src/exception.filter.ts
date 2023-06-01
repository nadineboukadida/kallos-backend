import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    if (status == HttpStatus.UNAUTHORIZED) {
      response.status(status).json({
        status,
        data: null,
        message: 'Unauthorized',
      });
    } else {
      response.status(status).json({
        status: status,
        message: 'an error has occurred',
        data: null,
      });
    }
  }
}
