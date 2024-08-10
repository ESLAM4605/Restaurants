import { Request, Response } from "express";
import userModel from "./users.model";
import { AppError, catchError } from "../../utils/error.handler";

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await userModel.find({ deletedAt: null });
  return res.json(users);
};

export const getUser = catchError(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await userModel.findById(id);

  if (!user) throw new AppError("User not found", 404);
  return res.json(user);
});

export const signUp = catchError(async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email });

  if (user) throw new AppError("User already exists", 409);
  const newUser = await userModel.create(req.body);
  return res.status(201).json(newUser);
});

export const signIn = catchError(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) throw new AppError("User not found", 404);
  if (user.password !== password) throw new AppError("Wrong password", 401);
  return res.status(200).send("User logged in successfully");
});

export const updateUser = catchError(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email } = req.body;
  const user = await userModel.findOne({ email, _id: { $ne: id } });

  if (user) throw new AppError("User already exists", 409);
  const updateUser = await userModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updateUser) throw new AppError("User not found", 404);
  return res.status(200).json(updateUser);
});

export const deleteUser = catchError(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await userModel.findByIdAndDelete(id);

  if (!user) throw new AppError("User not found", 404);
  return res.status(200).json(user);
});
