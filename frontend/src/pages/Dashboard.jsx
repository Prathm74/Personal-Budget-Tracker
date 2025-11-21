// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { getTransactions, getCategories, getBudget } from "../api/requests";
import IncomeExpenseChart from "../charts/IncomeExpenseChart";
import BudgetCompareChart from "../charts/BudgetCompareChart";

export default function Dashboard() {
  const [txs, setTxs] = useState([]);
  const [budget, setBudget] = useState(0);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    console.log("Loading dashboard...");
    try {
      const b = await getBudget();
      const c = await getCategories();
      const t = await getTransactions();

      setBudget(b?.amount || 0);
      setCategories(c || []);
      setTxs(t || []);
    } catch (err) {
      console.error("Dashboard load error:", err);
    }
  }


  const income = txs.filter(t => t.type === "income").reduce((s,t)=>s+Number(t.amount),0);
  const expense = txs.filter(t => t.type === "expense").reduce((s,t)=>s+Number(t.amount),0);

  return (
    <div className="page">
      <h2>Dashboard</h2>

      <div className="cards">
        <div className="card">Income<br/><strong>₹{income}</strong></div>
        <div className="card">Expense<br/><strong>₹{expense}</strong></div>
        <div className="card">Balance<br/><strong>₹{income - expense}</strong></div>
      </div>

      <div className="charts">
        <IncomeExpenseChart data={[{label:"Income", value: income},{label:"Expense", value: expense}]} />
        <BudgetCompareChart budget={income} spent={expense} />
      </div>
    </div>
  );
}
