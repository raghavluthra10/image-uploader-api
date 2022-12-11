import { Request, Response, NextFunction } from "express";
export default function addHeaders(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE",
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, auth",
  );

  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
}
