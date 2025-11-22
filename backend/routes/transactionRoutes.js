import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  getTransactions,
  createTransaction,
  deleteTransaction
} from "../controllers/transactionController.js";

const router = express.Router();

router.get("/", authMiddleware, getTransactions);
router.post("/", authMiddleware, createTransaction);
router.delete("/:id", authMiddleware, deleteTransaction);

export default router;
