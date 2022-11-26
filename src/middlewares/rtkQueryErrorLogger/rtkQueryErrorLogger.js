import {isRejectedWithValue} from "@reduxjs/toolkit";
import {message} from "antd";

import {translateError} from "./translateError";

export const rtkQueryErrorLogger = (api) => (next) => (action) => {
  if (action?.meta?.arg?.endpointName === "check") {
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

    let messageForUser = `Произошла ошибка ${errorStatus}`;
    if (errorMessage) {
      messageForUser += ` | ${errorMessage}`
    }

    message.error(messageForUser);
  }

  return next(action);
};
