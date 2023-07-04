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
import { ApiBody, ApiParam, ApiTags } from "@nestjs/swagger";

@ApiTags("User")
@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @ApiParam({
    name: "id",
    example: 1,
  })
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

  @ApiParam({
    name: "id",
    example: 1,
  })
  @Delete(":id")
  deleteUserById(@Param("id", ParseIntPipe) id: number) {
    return this.userService.removeUser(id);
  }

  @ApiParam({
    name: "id",
    example: 1,
  })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        email: { type: "string" },
        password: { type: "string" },
      },
    },
    examples: {
      example1: {
        value: {
          email: "xyz@gmail.com",
          password: "xyz@123",
        },
      },
    },
  })
  @Patch(":id")
  updateUser(
    @Param("id", ParseIntPipe) id: number,
    @Body() user: updateUserDto,
  ) {
    return this.userService.updateUser(id, user);
  }
}
