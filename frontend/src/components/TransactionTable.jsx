// src/components/TransactionTable.jsx
import React from "react";

export default function TransactionTable({ list = [], onDelete }) {
  return (
    <table className="transaction-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Amount</th>
          <th>Category</th>
          <th>Type</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {list.length === 0 && (
          <tr>
            <td colSpan="5" style={{ textAlign: "center", padding: 20 }}>
              No transactions found
            </td>
          </tr>
        )}

        {list.map((t) => (
          <tr key={t.id}>
            <td>{t.date}</td>
            <td>₹{t.amount}</td>
            <td>{t.category?.name || ""}</td>
            <td className={t.type === "income" ? "tag income" : "tag expense"}>
              {t.type}
            </td>
            <td>
              <button className="delete-btn" onClick={() => onDelete && onDelete(t.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
