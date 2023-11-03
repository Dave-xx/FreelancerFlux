import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/jwt.js";

const router = express.Router();

router.delete("/:id", verifyToken, deleteUser);
router.get("/:id", getUser);
router.get("/", getUsers);

export default router;
