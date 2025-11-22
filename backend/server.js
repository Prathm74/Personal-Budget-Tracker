import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/categories", categoryRoutes);
app.use("/transactions", transactionRoutes);

import budget from "./data/budget.js";
import authMiddleware from "./middlewares/authMiddleware.js";

app.get("/budget", authMiddleware, (req, res) => {
  res.json(budget);
});

app.post("/budget", authMiddleware, (req, res) => {
  const { amount } = req.body;
  if (amount == null)
    return res.status(400).json({ message: "Amount is required" });

  budget.amount = Number(amount);
  res.json({ message: "Budget updated", amount: budget.amount });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
