import { transactions } from "../data/transactions.js";
import { categories } from "../data/categories.js";

export const getTransactions = (req, res) => {
  res.json(transactions);
};

export const addTransaction = (req, res) => {
  const { amount, date, categoryId, type } = req.body;

  const categoryObj = categories.find(c => c.id === categoryId);

  const newTransaction = {
    id: transactions.length + 1,
    amount,
    date,
    type,
    category: categoryObj
  };

  transactions.push(newTransaction);
  res.json(newTransaction);
};

export const deleteTransaction = (req, res) => {
  const id = Number(req.params.id);

  const index = transactions.findIndex(t => t.id === id);
  if (index === -1)
    return res.status(404).json({ message: "Not found" });

  transactions.splice(index, 1);

  res.json({ message: "Transaction deleted" });
};
