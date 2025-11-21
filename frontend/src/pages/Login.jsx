// src/pages/Login.jsx
import React, { useState } from "react";
import { login, isLoggedIn } from "../api/requests";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  if (isLoggedIn()) {
    nav("/");
  }

  const onChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      setLoading(true);
      await login(form.email, form.password);
      nav("/");
    } catch (error) {
      setErr(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="center">
      <form className="login-card card" onSubmit={submit}>
        <h3>Login to BudgetApp</h3>

        {err && <div className="error">{err}</div>}

        <input name="email" type="email" placeholder="Email" value={form.email} onChange={onChange} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} />

        <button type="submit">{loading ? "Signing in..." : "Login"}</button>
      </form>
    </div>
  );
}
