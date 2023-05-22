import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material';
import { themeOptions } from './styles/theme';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <PersistGate loading={null} persistor={persistor}>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={createTheme(themeOptions)}>
              <App />
            </ThemeProvider>
          </StyledEngineProvider>
        </PersistGate>
      </LocalizationProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
