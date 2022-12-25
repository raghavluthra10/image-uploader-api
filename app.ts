import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
// import cors from "cors";
import cookieParser from "cookie-parser";
import { router } from "./routes/index";
import { database } from "./config/database";
import { User } from "./interfaces/databaseTables";
import addHeaders from "./middleware/cors";
import path from "path";

dotenv.config({ path: "./env" });

const app = express();
const port = 8000;

const checkDbConnection = async () => {
  try {
    const response = await database("user");
    if (response.length >= 0) {
      console.log("database =>", "connected Successfully!");
    }
  } catch (error) {
    console.log("Some error occured in database connection");
    console.log(error);
  }
};

checkDbConnection();

app.use(express.static(path.join(__dirname + "/client/dist")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// app.use(cors());
// const corsO

app.use(addHeaders);

app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port} `);
});
