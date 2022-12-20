import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router } from "./routes/index";
import { database } from "./config/database";
import { User } from "./interfaces/databaseTables";
import addHeaders from "./middleware/cors";

dotenv.config({ path: "./env" });

const app = express();
const port = 8000;

const checkDbConnection = async () => {
  try {
    const response = await database("user");
    console.log("response ->", response);
    if (response.length > 0) {
      console.log("database =>", "connected Successfully!");
    }
  } catch (error) {
    console.log("Some error occured in database connection");
    console.log(error);
  }
};

checkDbConnection();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// app.use(cors());
// const corsO

app.use(addHeaders);

app.use("/", router);

app.get("/", async (req: Request, res: Response) => {
  try {
    const getUser: User[] = await database("user").where({ id: 1 });
    console.log(getUser[0]);
    res.send("Hello World! =>" + JSON.stringify(getUser[0]));
  } catch (error: unknown) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port} `);
});
