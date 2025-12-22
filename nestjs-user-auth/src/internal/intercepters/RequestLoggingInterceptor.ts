/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { ResponseData } from '@/internal/global/ResponseData';
import { logError, logInfo } from '@/libs/winston/logger';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import * as zod from 'zod';
@Injectable()
export class RequestLoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req: Request = context.switchToHttp().getRequest();

    const { method, url, headers, body, query } = req;
    const requestId = headers['x-request-id'];
    const start = Date.now();

    logInfo('HTTP Request Started', {
      request_id: requestId,
      method,
      url,
      duration_ms: 0,
      status: context.switchToHttp().getResponse().statusCode,
      query,
      body,
    });

    return next.handle().pipe(
      tap((responseBody) => {
        logInfo('HTTP Request Completed', {
          request_id: requestId,
          method,
          url,
          duration_ms: Date.now() - start,
          status: context.switchToHttp().getResponse().statusCode,
          query,
          body,
          response: responseBody,
        });
      }),

      catchError((err) => {
        const message = err instanceof zod.ZodError ? err.issues[0].message : err.message;

        logError('HTTP Request Failed', {
          request_id: requestId,
          method,
          url,
          duration_ms: Date.now() - start,
          status: err.status ?? 500,
          query,
          body,
          error_message: message,
          error_stack: err.stack,
        });
        throw err;
      }),
    );
  }
}
