// ProtectedRoute.jsx
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, roles }) => {
  const usuarioLogueado = localStorage.getItem("token");
  const roleId = localStorage.getItem("roleId");

  if (!usuarioLogueado) {
    return <Navigate to="/Login" replace />;
  }

  // Verifica si el usuario tiene el rol adecuado para acceder a la ruta
  if (roles.includes(parseInt(roleId))) {
    return element;
  } else {
    // Redirige a una ruta pública si el rol no es válido
    return <Navigate to="/home" replace />;
  }
};

export default ProtectedRoute;
