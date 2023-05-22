import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';

import { Clients, NotFoundPage } from '@APP/views';
import { Header } from './components';
import './App.css';

const App = () => (
  <div className="App">
    <Header />
    <Box height={`calc(100% - 56px)`}>
      <Router>
        <Routes>
          <Route path="/clients" element={<Clients />} />,
          <Route path="/404" element={<NotFoundPage />} />,
          <Route path="" element={<Navigate to="/clients" replace />} />,
          <Route path="*" element={<Navigate to="/404" replace />} />,
        </Routes>
      </Router>
    </Box>
  </div>
);

export default App;
