// src/pages/Transactions.jsx
import React, { useEffect, useState } from "react";
import { getTransactions, deleteTransaction, getCategories } from "../api/requests";
import TransactionForm from "../components/TransactionForm";
import TransactionTable from "../components/TransactionTable";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    load();
    loadCategories();
  }, []);

  const load = async () => {
    try {
      const res = await getTransactions();
      setTransactions(res);
    } catch (err) {
      console.error(err);
    }
  };

  const loadCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdded = () => load();
  const handleDelete = async (id) => {
    if (!confirm("Delete this transaction?")) return;
    await deleteTransaction(id);
    load();
  };

  return (
    <div className="page">
      <h2>Transactions</h2>

      <TransactionForm onAdded={handleAdded} categoriesProp={categories} />

      <TransactionTable list={transactions} onDelete={handleDelete} />
    </div>
  );
}
