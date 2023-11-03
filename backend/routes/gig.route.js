import express from "express";
import {
  createGig,
  deleteGig,
  getGig,
  getGigs,
} from "../controllers/gig.controller.js";
import { verifyToken } from "../middlewares/jwt.js";

const router = express.Router();

router.post("/", verifyToken, createGig);
router.delete("/:gigId", verifyToken, deleteGig);
router.get("/:gigId", getGig);
router.get("/", getGigs);

export default router;
