import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Response } from "express";
import { TypeORMError } from "typeorm";

@Catch(TypeORMError)
export class TypeORMExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>();
    console.log(exception);

    res.json({
      statusCode: 500,
      timestamp: new Date().toISOString(),
      message: "Internal Server error",
    });
  }
}
