// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AuthForm from './components/AuthForm';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default route for the landing page */}
          <Route path="/" element={<LandingPage />} />
          {/* Route for the authentication page */}
          <Route path="/auth" element={<AuthForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
