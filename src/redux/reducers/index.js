import { combineReducers } from '@reduxjs/toolkit';
import clientsReducer from './clients';
import userReducer from './user';
import appReducer from './app';

const applicationReducer = combineReducers({
  app: appReducer,
  clients: clientsReducer,
  user: userReducer
});

const rootReducer = (state, action) => applicationReducer(state, action);

export { clientsReducer, userReducer };
export default rootReducer;
