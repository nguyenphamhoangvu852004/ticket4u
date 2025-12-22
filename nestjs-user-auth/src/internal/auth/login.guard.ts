import { Utils } from '@/utils/utils';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { log } from 'console';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class LoginGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const authorization = request.headers.authorization;
    if (!authorization) {
      throw new UnauthorizedException('Authorization header is missing');
    }
    log('Authorization Header:', authorization);

    // extract token from header
    const token = authorization.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }
    log('Extracted Token:', token);

    try {
      const decodedUser = Utils.verifyJWTToken(token, 'login');
      request['user'] = decodedUser;
      return true;
    } catch (error) {
      log(error);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
