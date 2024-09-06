// src/App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import DashBoard from './Pages/DashBoard';
import Income from './Pages/Income';
import Signup from './Pages/Signup';
import SideBar from './Components/SideBar';
import Login from './Pages/Login';
import EmergencyRouting from './Pages/EmergencyRouting/EmergencyRouting';
import Product from './Pages/Product/Product';
import { AuthProvider, AuthContext } from './context/AuthContext';
import AddTicketData from './Pages/AddTicketData';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './Components/ProtectedRoute'; // Import ProtectedRoute

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <MainContent />
      </Router>
    </AuthProvider>
  );
};

const MainContent = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const isLoginPage = location.pathname === '/';
  const isSignupPage = location.pathname === '/signup';

  return (
    <div className="app-container">
      { !isLoginPage && !isSignupPage && user && <SideBar /> }
      <div className="content">
        <Routes>
          {/* Public Routes */}
          <Route path='/signup' element={<Signup />} />
          <Route path='/' element={<Login />} />
          
          {/* Protected Routes */}
          <Route
            path='/dashboard'
            element={
              <ProtectedRoute>
                <DashBoard />
              </ProtectedRoute>
            }
          />
          <Route
            path='/revenue'
            element={
              <ProtectedRoute>
                <Income />
              </ProtectedRoute>
            }
          />
          <Route
            path='/product'
            element={
              <ProtectedRoute>
                <Product />
              </ProtectedRoute>
            }
          />
          <Route
            path='/Emergency-routing/*'
            element={
              <ProtectedRoute>
                <EmergencyRouting />
              </ProtectedRoute>
            }
          />
          <Route
            path='/AddTicketData'
            element={
              <ProtectedRoute>
                <AddTicketData />
              </ProtectedRoute>
            }
          />
          
          {/* Fallback Route for Undefined Paths */}
          <Route path='*' element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </div>
    </div>
  );
};

// Optional: Create a NotFound component for undefined routes
const NotFound = () => (
  <div className="error-message">
    <h2>Page Not Found</h2>
    <p>The page you are looking for does not exist.</p>
  </div>
);

export default App;
