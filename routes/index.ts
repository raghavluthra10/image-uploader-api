import express, { Request, Response } from "express";
const router = express.Router();
import { database } from "../config/database";
import bcrypt from "bcrypt";
import { User } from "../interfaces/databaseTables";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { login, signout, signup } from "../controllers/auth";
import { getAllUsers } from "../controllers/user";
import { addImageToFirebase, getAllImages } from "../controllers/storage";
import path from "path";

import multer from "multer";
import { authenticateUser } from "../middleware/authenticate";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname + "../../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

dotenv.config();

// file upload

// Auth
router.post("/login", login);
router.post("/signup", signup);
router.post("/signout", signout);

// users
router.get("/users", getAllUsers);

// firebase
router.post(
  "/image",
  authenticateUser,
  upload.single("image"),
  addImageToFirebase,
);
router.get("/image", authenticateUser, getAllImages);

export { router };
