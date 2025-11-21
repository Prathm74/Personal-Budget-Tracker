// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../api/requests";

export default function ProtectedRoute({ children }) {
  const logged = isLoggedIn();

  if (!logged) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
