import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  getCategories,
  createCategory,
  deleteCategory
} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/", authMiddleware, getCategories);
router.post("/", authMiddleware, createCategory);
router.delete("/:id", authMiddleware, deleteCategory);

export default router;
