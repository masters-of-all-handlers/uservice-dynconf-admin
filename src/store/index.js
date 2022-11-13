import { configureStore } from '@reduxjs/toolkit';
import { variableAPI } from '../services/VariableService';

export const store = configureStore({
  reducer: {
    [variableAPI.reducerPath]: variableAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(variableAPI.middleware),
});
