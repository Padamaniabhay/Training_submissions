import { Module } from "@nestjs/common";
import { UserModule } from "./modules/user/user.module";
import { AuthModule } from "./modules/auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ProductModule } from "./modules/product/product.module";
import { OrderModule } from "./modules/order/order.module";
import configuration from "./config/configuration";
import { DB_TYPE } from "./common/const";

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
          type: DB_TYPE,
          host: config.get("DATABASE.HOST"),
          port: +config.get("DATABASE.PORT"),
          username: config.get("DATABASE.USER"),
          password: config.get("DATABASE.PASSWORD"),
          database: config.get("DATABASE.NAME"),
          entities: [__dirname + "/../**/*.entity{.ts,.js}"],
          synchronize: true,
        };
      },
    }),
    ProductModule,
    OrderModule,
  ],
})
export class AppModule {}
