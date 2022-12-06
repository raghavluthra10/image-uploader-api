import express, { Request, Response } from "express";
const router = express.Router();
import { database } from "../config/database";
import multer from "multer";

// file upload

// Auth
router.post("/login", (req: Request, res: Response) => {
  res.send("login");
  console.log("Protected world");
});

router.post("/signup", (req, res) => {
  res.send("signup");
});

router.post("/signout", (req, res) => {
  res.send("signout");
});

export { router };
