import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { createUserDto } from "src/user/dtos/create-user.dto";
import { User } from "src/user/entity/user.entity";
import { UserService } from "src/user/user.service";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private userService: UserService,
    private JwtService: JwtService,
  ) {}

  async signUp(user: createUserDto) {
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

  signout() {}
}
