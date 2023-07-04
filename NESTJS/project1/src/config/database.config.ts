import { registerAs } from "@nestjs/config";

export const DATABASE_CONFIG = registerAs("DATABASE", () => {
  return {
    TYPE: process.env["DB_TYPE"],
    HOST: process.env["DB_HOST"],
    PORT: process.env["DB_PORT"],
    USER: process.env["DB_USER"],
    PASSWORD: process.env["DB_PASS"],
    NAME: process.env["DB_NAME"],
  };
});
