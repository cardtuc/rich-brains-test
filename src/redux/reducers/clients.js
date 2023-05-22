import { createReducer } from '@reduxjs/toolkit';
import { clearSelectedClient, setClients, setSelectedClient } from '../actions';

const initialState = {
  listOfClients: [],
  selectedClient: null
};

const clientsReducer = createReducer(initialState, {
  [setClients]: (state, { payload }) => {
    state.listOfClients = payload;
  },
  [setSelectedClient]: (state, { payload }) => {
    state.selectedClient = payload;
  },
  [clearSelectedClient]: (state) => {
    state.selectedClient = null;
  }
});

export default clientsReducer;
