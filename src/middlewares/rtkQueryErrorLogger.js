import {isRejectedWithValue} from "@reduxjs/toolkit";
import {message} from "antd";

export const rtkQueryErrorLogger = (api) => (next) => (action) => {
  // костыли)))
  if (action?.type.includes("authAPI")) {
    return next(action);
  }
  if (isRejectedWithValue(action)) {
    const {
      payload: {status, error},
    } = action;

    message.error(`Асинхронная ошибка ${status} | ${error}`);
  }

  return next(action);
};
