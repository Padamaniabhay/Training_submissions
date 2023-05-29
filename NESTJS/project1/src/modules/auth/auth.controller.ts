import { Body, Controller, Post } from "@nestjs/common";
import { createUserDto } from "src/modules/user/dtos/create-user.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signup")
  signUp(@Body() user: createUserDto) {
    return this.authService.signUp(user);
  }

  @Post("signIn")
  signIn(@Body() user: createUserDto) {
    return this.authService.signIn(user.email, user.password);
  }
}
