// src/components/TransactionForm.jsx
import React, { useEffect, useState } from "react";
import { getCategories, createTransaction } from "../api/requests";

export default function TransactionForm({ onAdded, categoriesProp }) {
  const [categories, setCategories] = useState(categoriesProp || []);
  const [loadingCats, setLoadingCats] = useState(false);
  const [form, setForm] = useState({
    amount: "",
    date: "",
    type: "expense",
    categoryId: "",
    description: "",
  });

  useEffect(() => {
     loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoadingCats(true);
      const res = await getCategories();
      console.log(res);
      setCategories(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingCats(false);
    }
  };

  const handleChange = (e) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.amount || !form.date || !form.categoryId) {
      alert("Please fill amount, date and category");
      return;
    }
    try {
      await createTransaction({
        amount: Number(form.amount),
        date: form.date,
        type: form.type,
        categoryId: Number(form.categoryId),
        description: form.description,
      });
      setForm({ amount: "", date: "", type: "expense", categoryId: "", description: "" });
      onAdded && onAdded();
    } catch (err) {
      alert(err.message || "Failed to add transaction");
    }
  };

  return (
    <form className="card form-card" onSubmit={submit}>
      <h3>Add transaction</h3>

      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
      />

      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
      />

      <select name="type" value={form.type} onChange={handleChange}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <select name="categoryId" value={form.categoryId} onChange={handleChange}>
        <option value="">Select Category</option>
        {loadingCats && <option>Loading...</option>}
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>

        ))}
      </select>

      <input
        name="description"
        placeholder="Description (optional)"
        value={form.description}
        onChange={handleChange}
      />

      <div style={{ display: "flex", gap: 12 }}>
        <button type="submit" className="btn-primary">Add</button>
      </div>
    </form>
  );
}
