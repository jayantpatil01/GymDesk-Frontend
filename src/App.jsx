import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// 1. Import your components
import ProtectedRoute from './utils/ProtectedRoute';
import Layout from './components/Layout';
import LoginPage from './pages/Login';
import Home from './pages/Home';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* PUBLIC ROUTE: Anyone can see the Login page */}
        <Route path="/" element={<LoginPage />} />

        {/* PROTECTED ROUTES: Only users with a token can see these */}
        {/* We wrap the 'Layout' so every page inside it is protected automatically */}
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          {/* This 'index' means when you go to /home, it shows the Home component */}
          <Route index element={<Home />} />
          
          {/* If you add a 'Members' page later, it goes here: */}
          {/* <Route path="members" element={<Members />} /> */}
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default App;