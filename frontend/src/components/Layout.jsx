// src/components/Layout.jsx
import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { clearToken } from "../api/requests";

export default function Layout() {
  const [open, setOpen] = useState(window.innerWidth >= 768);
  const nav = useNavigate();

  const logout = () => {
    clearToken();
    nav("/login");
  };

  return (
    <div className="layout">
      <aside className={open ? "sidebar open" : "sidebar"}>
        <div className="sidebar-header">
          <h2>BudgetApp</h2>
          <button className="close-btn" onClick={() => setOpen(false)}>✕</button>
        </div>

        <nav>
          <Link to="/">Dashboard</Link>
          <Link to="/transactions">Transactions</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/budget">Budget</Link>

          <button className="logout-btn" onClick={logout}>Logout</button>
        </nav>
      </aside>

      <main className="main-area">
        <button className="menu-btn" onClick={() => setOpen(true)}>☰</button>
        <div className="page-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
