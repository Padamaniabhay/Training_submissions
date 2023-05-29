import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private JwtService: JwtService) {}

  async canActivate(ctx: ExecutionContext) {
    try {
      const req = ctx.switchToHttp().getRequest<Request>();
      const token = req.headers["authorization"];

      if (!token) throw new UnauthorizedException("you are not authorized");

      const { user } = await this.JwtService.verifyAsync(token);
      req["user"] = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException("token not verifed");
    }
  }
}
