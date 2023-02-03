import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router } from "./routes/index";
import { database } from "./config/database";
import addHeaders from "./middleware/cors";
import path from "path";

dotenv.config({ path: "../.env" });

const app = express();
const PORT = process.env.PORT || 8000;

// app.use(cors());

app.use(express.static(path.join(__dirname + "../../client/dist")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(addHeaders);

app.use("/api", router);
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname + "../../client/dist/index.html"));
});
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT} `);
});
