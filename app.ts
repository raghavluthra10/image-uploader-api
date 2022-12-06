import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router } from "./routes/index";
import { database } from "./config/database";
import { User } from "./interfaces/databaseTables";

dotenv.config();

const app = express();
const port = 8000;

const checkDbConnection = () => {
  try {
    console.log("database =>", "connected Successfully!");
  } catch (error) {
    console.log(error);
  }
};

checkDbConnection();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors());

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
