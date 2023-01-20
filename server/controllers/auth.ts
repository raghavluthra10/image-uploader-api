import express, { Request, Response } from "express";
const router = express.Router();
import { database } from "../config/database";
import bcrypt from "bcrypt";
import { User } from "../interfaces/databaseTables";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const login = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const { email, password } = body;

    if (!(email && password)) {
      return res.json({
        success: false,
        message: "Please provide all credentials",
      });
    }

    const findUser = await database("user").where({ email });

    if (findUser.length == 0) {
      return res.json({ message: "User does not exists!", success: false });
    }

    const hashedPassword = findUser[0].password;

    bcrypt.compare(password, hashedPassword, (err, result) => {
      if (!result) {
        return res.status(401).send("Wrong credentials!");
      }
    });

    const payload = {
      userId: findUser[0].id,
      email: findUser[0].email,
    };

    const token = jwt.sign(payload, process.env.jwtSecret as string);

    console.log("token =>", token);
    // { httpOnly: true, secure: true }
    return res.status(200).json({
      message: "User logged in successfully!",
      accessToken: token,
      success: true,
      userName: findUser[0].name,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error!");
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!(name && email && password)) {
      return res.json({
        success: false,
        message: "Please provide all credentials",
      });
    }

    const checkIfUserAlreadyExists = await database("user").where({ email });

    if (checkIfUserAlreadyExists.length > 0) {
      return res.json({ success: false, message: "User already exists!" });
    }

    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        // Store hash in your password DB.
        await database("user").insert<User>({
          password: hash,
          name: name,
          email: email,
        });
      });
    });

    return res
      .status(200)
      .json({ message: "User Signed Up Successfully!!!", success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error!");
  }
};

export const signout = async (req: Request, res: Response) => {
  try {
    const cookie = req.cookies;
    console.log("cookie", cookie.auth);
    res.status(200).send("user signed out!");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};
