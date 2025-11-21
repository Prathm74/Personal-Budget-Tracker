// src/pages/Budget.jsx
import React from "react";
import { getTransactions } from "../api/requests";
import { useEffect, useState } from "react";

export default function Budget() {
  const [txs, setTxs] = useState([]);

  useEffect(() => {
    (async()=> {
      try {
        const res = await getTransactions();
        setTxs(res);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const spent = txs.filter(t=>t.type==='expense').reduce((s,t)=>s+Number(t.amount),0);
  const earned = txs.filter(t=>t.type==='income').reduce((s,t)=>s+Number(t.amount),0);

  return (
    <div className="page">
      <h2>Budget</h2>

      <div className="cards">
        <div className="card">Total Spent<br/><strong>₹{spent}</strong></div>
        <div className="card">Total Earned<br/><strong>₹{earned}</strong></div>
      </div>

      <div className="card" style={{marginTop:16}}>
        <p>You can set monthly budget in the backend or use the UI to compare spent vs budget when implemented.</p>
      </div>
    </div>
  );
}
