import express, { Request, Response } from "express";
const router = express.Router();
import { database } from "../config/database";
import bcrypt from "bcrypt";
import { User } from "../interfaces/databaseTables";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const data = await database("user");
    res.status(200).json({ success: true, data: JSON.stringify(data) });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error!" });
  }
};
