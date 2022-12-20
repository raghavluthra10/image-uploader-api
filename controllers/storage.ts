import express, { Request, Response } from "express";
import { IGetUserAuthInfoRequest } from "../interfaces/userInfo";
const router = express.Router();
import { database } from "../config/database";
import bcrypt from "bcrypt";
import { User } from "../interfaces/databaseTables";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import fs, { read } from "fs";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function encodeImageFileAsURL(element: any) {
  const reader = fs.readFileSync(element);
  return reader;
}

export const addImageToFirebase = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
) => {
  try {
    console.log("req.file ===>", req.file);
    const imageInfo = req.file?.path;
    const imageRef = ref(storage, `${req.file?.originalname}`);
    const bufferImage = encodeImageFileAsURL(imageInfo);

    const metadata = {
      contentType: "image/jpeg",
    };

    // publically accessible url
    let publicallyAccessibleUrl = "";

    const snapshot = await uploadBytes(imageRef, bufferImage, metadata);

    try {
      console.log(snapshot);
    } catch (error) {
      console.log(error);
      return;
    }

    const filename = req.file?.originalname;
    const pathRefernceForImageDownload = ref(storage, filename);

    const downloadUrl = await getDownloadURL(pathRefernceForImageDownload);
    try {
      publicallyAccessibleUrl = downloadUrl;
      console.log("publically accessible url ===>", publicallyAccessibleUrl);
    } catch (error) {
      console.log(error);
      return;
    }

    //make entry to db with url stored in it of the logged in user

    const userId = req.userId;

    await database("image_resources").insert({
      firebase_public_url: publicallyAccessibleUrl,
      user_id: userId,
    });

    // delete image from uploads dir using fs.unlink

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

// req.file ===> {
//   fieldname: 'image',
//   originalname: 'r.png',
//   encoding: '7bit',
//   mimetype: 'image/png',
//   destination: '/Users/raghav/Applications/practice-projects/express-typescript/uploads',
//   filename: 'r.png',
//   path: '/Users/raghav/Applications/practice-projects/express-typescript/uploads/r.png',
//   size: 6991
// }

export const getAllImages = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
) => {
  try {
    console.log("user info", req.userEmail, req.userId);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error!" });
  }
};
