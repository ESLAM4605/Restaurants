import express, { Request, Response } from "express";
import userRouter from "./modules/users/users.route";
import dotenv from "dotenv";
import connectToDb from "./DB/db.connection";
import { AppError } from "./utils/error.handler";
import { Error } from "mongoose";
dotenv.config();
const app = express();

app.use(express.json());
app.use("/users", userRouter);

connectToDb();

app.use((err: AppError, req: Request, res: Response, next: any) => {
  const { message, status, stack } = err;
  res.status(status || 500).json({ message, stack });
  console.log({ err });
});

app.all("*", (req: Request, res: Response, next: any) => {
  throw new AppError("Can't find this route", 400);
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
