import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { createUserDto } from "src/modules/user/dtos/create-user.dto";
import { UserService } from "src/modules/user/user.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private JwtService: JwtService,
  ) {}

  async signUp(user: createUserDto) {
    console.log(await this.userService.findByEmail(user.email));
    if (await this.userService.findByEmail(user.email)) {
      throw new BadRequestException("email in use, pleade sign in");
    }

    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    return await this.userService.createUser(user);
  }

  async signIn(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user)
      return new NotFoundException("email does not exist. please sign up");
    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException("wrong password");
    }

    const accessToken = await this.JwtService.signAsync({ user });

    return { token: accessToken };
  }
}
