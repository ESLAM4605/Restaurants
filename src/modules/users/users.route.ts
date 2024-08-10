import { Router } from "express";
import {
  getAllUsers,
  signUp,
  getUser,
  updateUser,
  deleteUser,
  signIn,
} from "./users.controller";

const router = Router();

router.route("/").get(getAllUsers);

router.route("/signup").post(signUp);

router.route("/signin").post(signIn);

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

export default router;
