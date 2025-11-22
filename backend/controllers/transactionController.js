import transactions from "../data/transactions.js";
import categories from "../data/categories.js";

export const getTransactions = (req, res) => {
  res.json(transactions);
};

export const createTransaction = (req, res) => {
  const { amount, date, type, categoryId, description } = req.body;

  if (!amount || !date || !type || !categoryId)
    return res.status(400).json({ message: "Missing fields" });

  const category = categories.find(c => c.id === Number(categoryId));
  if (!category)
    return res.status(400).json({ message: "Invalid categoryId" });

  const newTx = {
    id: transactions.length + 1,
    amount: Number(amount),
    date,
    type,
    category,
    description: description || ""
  };

  transactions.push(newTx);

  res.json(newTx);
};

export const deleteTransaction = (req, res) => {
  const id = Number(req.params.id);
  const idx = transactions.findIndex(t => t.id === id);

  if (idx === -1)
    return res.status(404).json({ message: "Transaction not found" });

  transactions.splice(idx, 1);

  res.json({ message: "Transaction deleted" });
};
