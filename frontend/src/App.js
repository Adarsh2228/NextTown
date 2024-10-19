import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import BusinessRegistration from './components/BusinessRegistration';
import BusinessProfile from './components/BusinessProfile';
import BusinessPromotion from './components/BusinessPromotion'; 
import BusinessSearch from './components/BusinessSearch';

function App() {
  const [currentUserId, setCurrentUserId] = useState(null); // State to hold the logged-in user ID

  const handleLogin = (userId) => {
    setCurrentUserId(userId); // Update the current user ID on login
  };

  return (
    <Router>
      {/* Define application routes */}
      <Routes>
        {/* Default route to login page */}
        <Route path="/" element={<Login onLogin={handleLogin} />} /> {/* Pass handleLogin to Login */}
        
        {/* Other routes for registration and business functionalities */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} /> {/* Pass handleLogin to Login */}
        <Route path="/business/register" element={<BusinessRegistration />} />
        <Route path="/business/search" element={<BusinessSearch />} /> 
        <Route path="/business/:id" element={<BusinessProfile loggedInUserId={currentUserId} />} /> {/* Pass currentUserId */}
        
        {/* New route for Business Promotion Page */}
        <Route path="/business/promotion/:id" element={<BusinessPromotion />} />

        {/* Redirect any unmatched routes to login page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;