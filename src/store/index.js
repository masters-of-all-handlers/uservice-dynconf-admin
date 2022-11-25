import {configureStore} from "@reduxjs/toolkit";

import {userverAPI} from "../services/UserverService";
import {authAPI} from "../services/AuthService";
import {rtkQueryErrorLogger} from "../middlewares/rtkQueryErrorLogger";

export const store = configureStore({
  reducer: {
    [userverAPI.reducerPath]: userverAPI.reducer,
    [authAPI.reducerPath]: authAPI.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authAPI.middleware, userverAPI.middleware, rtkQueryErrorLogger),
});
