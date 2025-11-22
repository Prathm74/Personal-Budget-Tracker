// src/api/requests.js
// const API_URL = "http://localhost:5000";
const API_URL = "https://personal-budget-tracker-qebs.onrender.com";


// Token helpers
export const saveToken = (token) => localStorage.setItem("token", token);
export const getToken = () => localStorage.getItem("token");
export const clearToken = () => localStorage.removeItem("token");
export const isLoggedIn = () => !!getToken();

const authHeader = () => {
  const token = getToken();
  return token
    ? { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
    : { "Content-Type": "application/json" };
};

// ----------------- AUTH -----------------
export async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Login failed");
  }
  const data = await res.json();
  saveToken(data.token);
  return data;
}

// ----------------- CATEGORIES -----------------
export async function getCategories() {
  const res = await fetch(`${API_URL}/categories`, { headers: authHeader() });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function createCategory(payload) {
  const res = await fetch(`${API_URL}/categories`, {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to create category");
  }
  return res.json();
}

export async function deleteCategory(id) {
  const res = await fetch(`${API_URL}/categories/${id}`, {
    method: "DELETE",
    headers: authHeader(),
  });
  if (!res.ok) throw new Error("Failed to delete category");
  return res.json();
}

// ----------------- TRANSACTIONS -----------------
export async function getTransactions() {
  const res = await fetch(`${API_URL}/transactions`, { headers: authHeader() });
  if (!res.ok) throw new Error("Failed to fetch transactions");
  return res.json();
}

/*
 Expecting payload:
 {
   amount: Number,
   date: "YYYY-MM-DD",
   type: "income"|"expense",
   categoryId: Number,
   description?: string
 }
*/
export async function createTransaction(payload) {
  const res = await fetch(`${API_URL}/transactions`, {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to create transaction");
  }
  return res.json();
}

export async function deleteTransaction(id) {
  const res = await fetch(`${API_URL}/transactions/${id}`, {
    method: "DELETE",
    headers: authHeader(),
  });
  if (!res.ok) throw new Error("Failed to delete transaction");
  return res.json();
}

// ----------------- BUDGET -----------------
export async function getBudget() {
  const res = await fetch(`${API_URL}/budget`, { headers: authHeader() });
  if (!res.ok) throw new Error("Failed to fetch budget");
  return res.json();
}

export async function setBudget(payload) {
  const res = await fetch(`${API_URL}/budget`, {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to set budget");
  }
  return res.json();
}
