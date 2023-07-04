import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { createUserDto } from "../user/dtos/create-user.dto";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";

describe("AuthService", () => {
  let service: AuthService;
  let userDto: createUserDto = { email: "xyz@gmail.com", password: "password" };
  const mockUserService = {
    async createUser(user: createUserDto) {
      userDto = user;
      return userDto;
    },
    findByEmail(email: string): void | createUserDto {
      return;
    },
  };

  let mockJwtService = {
    async signAsync(email: string) {
      return "dasfdadfagrsdfjfaskjrtj546jk546jdfsljkadslkj";
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UserService, JwtService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .overrideProvider(JwtService)
      .useValue(mockJwtService)
      .compile();

    service = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("user sign up", async () => {
    const user = await service.signUp(userDto);
    expect(user).toEqual(userDto);
  });

  it("user sign in", async () => {
    mockUserService.findByEmail = (email: string) => {
      return userDto;
    };
    const user = await service.signIn("xyz@gmail.com", "password");
    expect(user).toEqual({
      token: "dasfdadfagrsdfjfaskjrtj546jk546jdfsljkadslkj",
    });
  });
});
