import {configureStore} from "@reduxjs/toolkit";

import {variableAPI} from "../services/VariableService";
import {rtkQueryErrorLogger} from "../middlewares/rtkQueryErrorLogger";

export const store = configureStore({
  reducer: {
    [variableAPI.reducerPath]: variableAPI.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(variableAPI.middleware, rtkQueryErrorLogger),
});
