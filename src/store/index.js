import {configureStore} from "@reduxjs/toolkit";

import {variableAPI} from "../services/UserverService";
import {authAPI} from "../services/AuthService";
import {rtkQueryErrorLogger} from "../middlewares/rtkQueryErrorLogger";

export const store = configureStore({
  reducer: {
    [variableAPI.reducerPath]: variableAPI.reducer,
    [authAPI.reducerPath]: authAPI.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authAPI.middleware, variableAPI.middleware, rtkQueryErrorLogger),
});
