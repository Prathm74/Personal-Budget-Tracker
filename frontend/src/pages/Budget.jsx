// src/pages/Budget.jsx
import React from "react";
import { getTransactions, getBudget, setBudget } from "../api/requests";
import { useEffect, useState } from "react";

export default function Budget() {
  const [txs, setTxs] = useState([]);
  const [budget, setBud] = useState(0);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async()=> {
      try {
        const res = await getTransactions();
        setTxs(res);
        const b = await getBudget();
        setBud(b?.amount || 0);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const save = async (e) => {
    e.preventDefault();
    if (!value) return alert("Enter amount");
    setLoading(true);
    try {
      await setBudget({ amount: Number(value) });
      setBud(Number(value));
      setValue("");
    } catch (err) {
      alert(err.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  const spent = txs.filter(t=>t.type==='expense').reduce((s,t)=>s+Number(t.amount),0);
  const earned = txs.filter(t=>t.type==='income').reduce((s,t)=>s+Number(t.amount),0);

  return (
    <div className="page">
      <h2>Budget</h2>

      <div className="cards">
        <div className="card">Total Spent<br/><strong>₹{spent}</strong></div>
        <div className="card">Total Earned<br/><strong>₹{earned}</strong></div>
        <div className="card">Budget<br/><strong>₹{budget}</strong></div>
      </div>

      <div className="card" style={{marginTop:16}}>
        <form onSubmit={save}>
          <input placeholder="Set monthly budget" value={value} onChange={e=>setValue(e.target.value)} />
          <button disabled={loading}>{loading ? "Saving..." : "Save Budget"}</button>
        </form>
      </div>
    </div>
  );
}
