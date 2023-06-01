import { HttpStatus } from '@nestjs/common';

export interface ApiResponse<T = object> {
  status: number;
  message: string;
  data: T | Promise<T>;
}

export default abstract class AbstractController {
  successResponse<T>(data: T = null, message: string = '') {
    return this.apiResponseReturn(data, message, HttpStatus.OK);
  }

  notFoundResponse<T>(data: T = null, message: string = 'Not found') {
    return this.apiResponseReturn(data, message, HttpStatus.NOT_FOUND);
  }

  unauthorizedResponse<T>(data: T = null, message: string = 'Unauthorized') {
    return this.apiResponseReturn(data, message, HttpStatus.UNAUTHORIZED);
  }

  internalErrorResponse<T>(data: T = null, message: string = 'Internal error') {
    return this.apiResponseReturn(
      data,
      message,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  private async apiResponseReturn<T>(
    data: T = null,
    message: string = '',
    status: number = HttpStatus.OK,
  ): Promise<ApiResponse<T>> {
    return {
      status,
      message,
      data: await data,
    };
  }
}
