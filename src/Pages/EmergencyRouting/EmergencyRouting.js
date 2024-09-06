import React, { useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import AddBus from './AddBus';
import './EmergencyRouting.css';
import ProtectedRoute from '../../Components/ProtectedRoute';
import AddRoute from './AddRoute';

const EmergencyRouting = () => {
  const [selectedOption, setSelectedOption] = useState('add-bus');
  const navigate = useNavigate();

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    navigate(option); 
  };

  return (
    <div className="emergencyrouting-container">
      <div className="radio-inputs">
        <label className="radio">
          <input
            type="radio"
            name="radio"
            checked={selectedOption === 'add-bus'}
            onChange={() => handleOptionChange('add-bus')}
          />
          <span className={`name ${selectedOption === 'add-bus' ? 'active' : ''}`}>
            Add Bus
          </span>
        </label>
        
        <label className="radio">
          <input
            type="radio"
            name="radio"
            checked={selectedOption === 'add-route'}
            onChange={() => handleOptionChange('add-route')}
          />
          <span className={`name ${selectedOption === 'add-route' ? 'active' : ''}`}>
            Add Route
          </span>
        </label>
      </div>

      <Routes>
        <Route path="/" element={<Navigate to="add-bus" />} />
        <Route
          path="add-bus"
          element={
            <ProtectedRoute>
              <AddBus />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="add-route"
          element={
            <ProtectedRoute>
              <AddRoute />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default EmergencyRouting;
