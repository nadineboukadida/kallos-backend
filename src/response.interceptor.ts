import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Response } from 'express';
import { map, Observable } from 'rxjs';
import { ApiResponse } from './abstract.controller';

@Injectable()
export class TransformationInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(private reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        switch(data?.status) {
            case HttpStatus.NOT_FOUND:
            context.switchToHttp().getResponse().status(HttpStatus.NOT_FOUND);
            break;
            case HttpStatus.INTERNAL_SERVER_ERROR:
            context.switchToHttp().getResponse().status(HttpStatus.INTERNAL_SERVER_ERROR);
            break;
            case HttpStatus.UNAUTHORIZED:
            context.switchToHttp().getResponse().status(HttpStatus.UNAUTHORIZED);
            break;
        }
        return data;
      }),
    );
  }
}
