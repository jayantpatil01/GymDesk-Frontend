import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const location = useLocation();

  if (!token) {
    // We pass the message via 'state' so the Login page can read it
    return <Navigate 
      to="/" 
      state={{ message: "Access denied. Please login to access this page." }} 
      replace 
    />;
  }

  return children;
};

export default ProtectedRoute;