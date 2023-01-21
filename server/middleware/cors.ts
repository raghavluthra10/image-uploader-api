import { Request, Response, NextFunction } from "express";
export default function addHeaders(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const allowedOrigins = [
    "http://localhost:5173",
    "https://image-uploader-api-production.up.railway.app",
  ];

  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin as string)) {
    res.setHeader("Access-Control-Allow-Origin", origin as string);
  }

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
