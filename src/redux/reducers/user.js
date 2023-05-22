import { createReducer } from '@reduxjs/toolkit';
import { clearUser, setUser } from '../actions';

const initialState = null;

const userReducer = createReducer(initialState, {
  [setUser]: (state, { payload }) => payload,
  [clearUser]: () => initialState
});

export default userReducer;
