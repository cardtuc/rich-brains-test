import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';

import { Clients, NotFoundPage } from '@APP/views';
import { Header, Loader, SnackbarAlert } from '@APP/components';
import { getAppLoading, getAppSnackbar, hideSnackbar } from '@APP/redux';
import './App.css';

const App = () => {
  const isLoading = useSelector(getAppLoading);
  const snackbar = useSelector(getAppSnackbar);
  const dispatch = useDispatch();

  return (
    <div className="App">
      {isLoading && <Loader />}
      <SnackbarAlert
        message={snackbar.message}
        handleClose={() => dispatch(hideSnackbar())}
        severity={snackbar.severity}
        open={!!snackbar.message}
      />
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
};

export default App;
