import express, { Request, Response } from "express";
import { IGetUserAuthInfoRequest } from "../interfaces/userInfo";
const router = express.Router();
import { database } from "../config/database";
import bcrypt from "bcrypt";
import { User } from "../interfaces/databaseTables";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import fs, { PathLike, read } from "fs";
import { storage } from "../firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  FirebaseStorage,
  deleteObject,
} from "firebase/storage";

function encodeImageFileAsURL(element: any) {
  const reader = fs.readFileSync(element);
  return reader;
}

export const addImageToFirebase = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
) => {
  try {
    const imageFile = req.file;

    const imagePath = req.file?.path;
    const filename = req.file?.originalname;

    const imageRef = ref(storage, `${req.file?.originalname}`);
    const bufferImage = encodeImageFileAsURL(imagePath);

    const metadata = {
      contentType: "image/jpeg",
    };

    // publically accessible url
    let publicallyAccessibleUrl = "";

    // try {
    await uploadBytes(imageRef, bufferImage, metadata);
    // } catch (error) {
    //   console.log(error);
    //   return;
    // }

    const pathRefernceForImageDownload = ref(storage, filename);

    // try {
    const downloadUrl = await getDownloadURL(pathRefernceForImageDownload);
    publicallyAccessibleUrl = downloadUrl;
    console.log("publically accessible url ===>", publicallyAccessibleUrl);
    // } catch (error) {
    //   console.log(error);
    //   return;
    // }

    const userId = req.userId;

    await database("image_resources").insert({
      firebase_public_url: publicallyAccessibleUrl,
      user_id: userId,
      file_reference: filename,
    });

    // remove file from uploads folder
    fs.unlink(imagePath as PathLike, (err) => {
      if (err) console.log(err);
    });

    return res.status(200).json({
      success: true,
      data: imageFile,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

export const deleteImageFromFirebase = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
) => {
  try {
    const userId = req.userId;
    const queries = req.query.firebase_public_url;

    const getFileReferenceFromDb = await database("image_resources").where({
      user_id: userId,
      firebase_public_url: queries,
    });

    const fileReference = getFileReferenceFromDb[0].file_reference;

    console.log("get file =>", getFileReferenceFromDb, fileReference);

    const deleteRef = ref(storage, fileReference);

    try {
      const response = await deleteObject(deleteRef);
      console.log(response);
    } catch (error) {
      return console.log(error);
    }

    // delete record from db
    await database("image_resources")
      .where({ user_id: userId, firebase_public_url: queries })
      .del();

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

export const getSingleUsersImages = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
) => {
  try {
    const userId = req.userId;
    const data = await database("image_resources").where({ user_id: userId });

    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

export const getAllImages = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
) => {
  try {
    const images = await database("image_resources");

    return res.status(200).json({
      success: true,
      data: images,
    });
    // console.log("user info", req.userEmail, req.userId);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error!" });
  }
};
