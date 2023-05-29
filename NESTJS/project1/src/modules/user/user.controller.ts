import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
} from "@nestjs/common";
import { updateUserDto } from "./dtos/update-user.dto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Get(":id")
  getUserById(
    @Param(
      "id",
      new ParseIntPipe({
        exceptionFactory(error) {
          return new HttpException(
            "id must be numeric string",
            HttpStatus.BAD_REQUEST,
          );
        },
      }),
    )
    id: number,
  ) {
    return this.userService.getuserById(id);
  }

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Delete(":id")
  deleteUserById(@Param("id", ParseIntPipe) id: number) {
    return this.userService.removeUser(id);
  }

  @Patch(":id")
  updateUser(
    @Param("id", ParseIntPipe) id: number,
    @Body() user: updateUserDto,
  ) {
    return this.userService.updateUser(id, user);
  }
}
