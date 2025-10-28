// src/components/PrivateRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    // Mientras carga la sesión desde localStorage
    return <div>Cargando...</div>; // o un spinner
  }

  if (!user) {
    // Si no hay usuario logueado, redirige al login
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.rol_id)) {
    // Si el rol no está permitido, redirige al login
    return <Navigate to="/" replace />;
  }

  // Usuario autorizado
  return children;
};

export default PrivateRoute;
