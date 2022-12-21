import express, { Request, Response, NextFunction } from "express";
import { IGetUserAuthInfoRequest } from "../interfaces/userInfo";
import { database } from "../config/database";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "../env" });

interface JwtInterface {
  userId: number;
  email: string;
  iat: number;
}

export const authenticateUser = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authToken = JSON.stringify(req.headers.auth);

    if (!authToken) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    // eslint-disable-next-line quotes
    const extractToken = authToken.split('"');

    const jwtToken = extractToken[1];
    console.log("jwt token =>", jwtToken);

    const decode = jwt.verify(
      jwtToken,
      process.env.jwtSecret as string,
    ) as JwtInterface;
    console.log("decoded", decode);
    const { userId, email } = decode;

    if (!decode) {
      return res.status(400).json({
        success: false,
        message: "User not authorized",
      });
    }

    req.userId = userId;
    req.userEmail = email;

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error!");
  }
};
