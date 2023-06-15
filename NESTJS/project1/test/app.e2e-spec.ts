import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/app.module";
import { TypeORMExceptionFilter } from "src/filter/typeorm.filter";
import { createUserDto } from "src/modules/user/dtos/create-user.dto";

describe("AppController (e2e)", () => {
  let app: INestApplication;
  let userDto: createUserDto = {
    email: "xyz12@gmail.com",
    password: "password",
  };
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ transform: true, whitelist: true }),
    );
    app.useGlobalFilters(new TypeORMExceptionFilter());
    await moduleFixture.get("UserRepository").delete({});
    await app.init();
  });

  it("/auth/signup (POST)", async () => {
    const res = await request(app.getHttpServer())
      .post("/auth/signup")
      .send(userDto)
      .expect(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        email: expect.any(String),
        password: expect.any(String),
        id: expect.any(Number),
      }),
    );
  });

  it("/auth/signin (POST)", async () => {
    const res = await request(app.getHttpServer())
      .post("/auth/signin")
      .send(userDto)
      .expect(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      }),
    );
  });
});
