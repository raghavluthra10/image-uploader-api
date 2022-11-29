import express, { Request, Response, NextFunction } from "express";
const app = express();
const port = 8000;

app.get("/", (req: Request, res: Response) => {
   res.send("Hello World!");
});

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`);
});
