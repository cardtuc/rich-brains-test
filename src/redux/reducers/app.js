import { createReducer } from '@reduxjs/toolkit';
import { showLoader, hideLoader, showSnackbar, hideSnackbar } from '../actions';

const initialState = {
  isLoading: false,
  snackbar: {
    message: '',
    severity: 'success'
  }
};

const appReducer = createReducer(initialState, {
  [showLoader]: (state) => {
    state.isLoading = true;
  },
  [hideLoader]: (state) => {
    state.isLoading = false;
  },
  [showSnackbar]: (state, { payload }) => {
    state.snackbar = { ...initialState.snackbar, ...payload };
  },
  [hideSnackbar]: (state) => {
    state.snackbar = initialState.snackbar;
  }
});

export default appReducer;
