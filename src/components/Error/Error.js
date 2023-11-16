import React from 'react';
import { NavLink } from 'react-router-dom';
import './error.css'; 

const Error = () => {
  return (
    <div className="error-404-container">
      <h2 className="error-404-title">404 - Page Not Found !</h2>
      <p className="error-404-text">This page you are looking doesn't exist.</p>
      <NavLink to="/" className="error-404-link">Go to Home Page</NavLink>
    </div>
  );
};

export default Error;
