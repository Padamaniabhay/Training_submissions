import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { createUserDto } from "../user/dtos/create-user.dto";

describe("AuthController", () => {
  let controller: AuthController;
  let userDto: createUserDto = { email: "xyz@gmail.com", password: "password" };
  const mockAuthService = {
    signUp(user: createUserDto) {
      userDto = user;
      return userDto;
    },
    signIn(email: string, password: string) {
      return { token: "dsfkjlrfdsajt543ljhdhsaskuea" };
    },
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("user sign up", async () => {
    const user = await controller.signUp(userDto);
    expect(user).toEqual(userDto);
  });

  it("user sign in", async () => {
    const token = await controller.signIn(userDto);
    expect(token).toEqual({
      token: "dsfkjlrfdsajt543ljhdhsaskuea",
    });
  });
});
