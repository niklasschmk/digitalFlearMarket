import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import {ISession} from "../../ISession";
import {Request} from 'express'

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean  {
    const http = context.switchToHttp();
    const request = http.getRequest<Request>();
    const session = request.session as ISession;

    return session.isLoggedIn == true;
  }
}
