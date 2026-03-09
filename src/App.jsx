import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Layouts import
import Layout from './components/Layout'

// Pages import 
import Loginpage from './pages/Login'
import Home from './pages/Home'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Loginpage />} />

        {/* Private Routes grouped under Layout */}
        <Route path="/home" element={<Layout />}>
          <Route index element={<Home />} />
          
          {/* Example of adding another page later: */}
          {/* <Route path="members" element={<Members />} /> */}
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App