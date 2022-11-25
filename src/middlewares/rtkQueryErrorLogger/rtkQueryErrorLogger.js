import {isRejectedWithValue} from "@reduxjs/toolkit";
import {message} from "antd";

import {translateError} from "./translateError";

export const rtkQueryErrorLogger = (api) => (next) => (action) => {
  // костыли)))
  if (action?.type.includes("authAPI")) {
    return next(action);
  }

  if (isRejectedWithValue(action)) {
    const {
      payload: {error, status, data},
    } = action;

    const errorStatus = Boolean(data?.code) ? data.code : status;
    const errorMessage = Boolean(data?.message)
      ? translateError(data.message)
      : translateError(error);

    message.error(`${errorStatus} | ${errorMessage}`, 7);
  }

  return next(action);
};
