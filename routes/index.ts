import express, { Request, Response } from "express";
const router = express.Router();
import { database } from "../config/database";
import bcrypt, { hash } from "bcrypt";
import { User } from "../interfaces/databaseTables";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// file upload

// Auth
router.post("/login", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const { email, password } = body;
    console.log("login body =>", email, password);

    if (!(email && password)) {
      return res.status(400).send("Please provide all credentials!");
    }

    const findUser = await database("user").where({ email });

    if (findUser.length == 0) {
      return res.status(404).send("User does not exists!");
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
    res
      .status(200)
      .cookie("auth", token)
      .send({ message: "User logged in successfully!", accessToken: token });

    return res.status(200).send(req.body);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error!");
  }
});

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!(name && email && password)) {
      return res.status(400).send("Please provide all credentials!");
    }

    const checkIfUserAlreadyExists = await database("user").where({ email });

    if (checkIfUserAlreadyExists.length > 0) {
      return res.status(400).send("User already exists!");
    }

    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        // Store hash in your password DB.
        console.log("hash ===>", password, hash);
        await database("user").insert<User>({
          password: hash,
          name: name,
          email: email,
        });
      });
    });

    return res.status(200).send("User Signed Up Successfully!!!");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error!");
  }
});

router.post("/signout", async (req, res) => {
  try {
    const cookie = req.cookies;
    console.log("cookie", cookie.auth);
    res.status(200).send("user signed out!");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
});

// users
router.get("/users", async (req, res) => {
  try {
    const data = await database("user");
    res.status(200).json({ success: true, data: JSON.stringify(data) });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error!" });
  }
});

export { router };
