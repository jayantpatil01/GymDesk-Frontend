import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ProtectedRoute from './utils/ProtectedRoute';
import Layout from './components/Layout';
import LoginPage from './pages/Login';
import Home from './pages/Home';
import AddMemberForm from './pages/AddMemberForm';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTE */}
        <Route path="/" element={<LoginPage />} />

        {/* PROTECTED ROUTES WRAPPER */}
        <Route 
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          {/* Now these routes sit directly at the root level */}
          <Route path="/home" element={<Home />} />
          <Route path="/add-member" element={<AddMemberForm />} />
        </Route>

        {/* Optional: Redirect any unknown routes to home or login */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;