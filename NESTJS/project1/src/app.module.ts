import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import configuration from "./config/configuration";

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: configuration,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: "postgres",
          host: config.get("DATABASE.HOST"),
          port: +config.get("DATABASE.PORT"),
          username: config.get("DATABASE.USER"),
          password: config.get("DATABASE.PASSWORD"),
          database: config.get("DATABASE.NAME"),
          entities: ["dist/**/*.entity{.ts,.js}"],
          synchronize: true,
        };
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
