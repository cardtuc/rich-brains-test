import { combineReducers } from '@reduxjs/toolkit';
import clientsReducer from './clients';
import userReducer from './user';

const appReducer = combineReducers({
  clients: clientsReducer,
  user: userReducer
});

const rootReducer = (state, action) => appReducer(state, action);

export { clientsReducer, userReducer };
export default rootReducer;
