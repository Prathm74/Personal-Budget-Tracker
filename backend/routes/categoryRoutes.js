import express from "express";
import { getCategories, addCategory } from "../controllers/categoryController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getCategories);
router.post("/", authMiddleware, addCategory);

export default router;
