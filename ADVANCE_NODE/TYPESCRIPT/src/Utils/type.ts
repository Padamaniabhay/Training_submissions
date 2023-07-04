import { Request } from "express";

export interface CustomRequest extends Request {
  user?: { _id: string };
}

export interface CustomError extends Error {
  status?: number;
}

export type QueryParams = {
  page?: string;
  limit?: string;
  search?: string;
};
