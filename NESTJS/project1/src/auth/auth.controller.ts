import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from "@nestjs/common";
import { createUserDto } from "src/user/dtos/create-user.dto";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./guards/auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signup")
  @UseGuards(AuthGuard)
  signUp(@Body() user: createUserDto) {
    return this.authService.signUp(user);
  }

  @Post("signIn")
  signIn(@Body() user: createUserDto) {
    return this.authService.signIn(user.email, user.password);
  }
}
