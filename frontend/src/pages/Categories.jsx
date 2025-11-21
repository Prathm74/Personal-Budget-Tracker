// src/pages/Categories.jsx
import React, { useEffect, useState } from "react";
import { getCategories, createCategory, deleteCategory } from "../api/requests";

export default function Categories() {
  const [cats, setCats] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("expense");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await getCategories();
      setCats(res);
    } catch (err) {
      console.error(err);
    }
  };

  const add = async (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Enter name");
    setLoading(true);
    try {
      await createCategory({ name, type });
      setName("");
      setType("expense");
      await load();
    } catch (err) {
      alert(err.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete this category?")) return;
    await deleteCategory(id);
    await load();
  };

  return (
    <div className="page">
      <h2>Categories</h2>

      <div className="card form-card">
        <form onSubmit={add}>
          <input placeholder="Category name" value={name} onChange={e=>setName(e.target.value)} />
          <select value={type} onChange={e=>setType(e.target.value)}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          <button disabled={loading}>{loading ? "Adding..." : "Add Category"}</button>
        </form>
      </div>

      <div style={{marginTop:16}}>
        {cats.map(c => (
          <div key={c.id} className="category-card">
            <div>
              <strong>{c.name}</strong>
              <span className={`tag ${c.type}`}>{c.type}</span>
            </div>
            <div>
              <button className="delete-btn" onClick={()=>remove(c.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
