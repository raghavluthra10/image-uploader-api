import { Request } from "express";

export interface UserInfo {
  userId: number;
  email: string;
}

export interface IGetUserAuthInfoRequest extends Request {
  userId?: number;
  userEmail?: string;
}
