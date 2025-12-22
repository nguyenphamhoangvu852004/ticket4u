import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { ZodError } from 'zod';
import { HttpStatus, ResponseData } from '@/internal/global/ResponseData';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>();

    // 1. Zod validation error
    if (exception instanceof ZodError) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(ResponseData.error(HttpStatus.BAD_REQUEST, exception.issues[0].message, null));
    }

    // 2. Nest HttpException
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      return res.status(status).json(ResponseData.error(status, exception.message, null));
    }

    // 3. Error thường
    if (exception instanceof Error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(ResponseData.error(HttpStatus.INTERNAL_SERVER_ERROR, exception.message, null));
    }

    // 4. fallback
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(ResponseData.error(HttpStatus.INTERNAL_SERVER_ERROR, 'Internal server error', null));
  }
}
