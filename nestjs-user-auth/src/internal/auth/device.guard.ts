import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { UAParser } from 'ua-parser-js';

@Injectable()
export class DeviceGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const ua = request.headers['user-agent'];
    if (!ua) {
      return false;
    }
    const parser = new UAParser(ua);
    console.log('🚀 ~ DeviceGuard ~ canActivate ~ parser:', parser.getResult());

    return true;
  }
}
