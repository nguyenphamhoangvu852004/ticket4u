import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';

@Injectable()
export class LoggingGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const requestID = request.headers['X-Request-Id'] ?? uuid();

    request['X-Request-Id'] = requestID;

    console.log('🚀 ~ LoggingGuard ~ canActivate ~ request:', request);
    return true;
  }
}
