import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Educator from './pages/Educator';
import Admin from './pages/Admin';
import Forgot from './pages/Forgot';
import Reset from './pages/Reset';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/educator" element={<Educator />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="reset" element={<Reset />} />
      </Routes>
    </Router>
  );
}

export default App;

