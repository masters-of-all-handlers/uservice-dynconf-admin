import {isRejectedWithValue} from "@reduxjs/toolkit";
import {message} from "antd";

export const rtkQueryErrorLogger = (api) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const {
      payload: {status, error},
    } = action;

    message.error(`Ошибка при загрузке данных ${status} | ${error}`);
  }

  return next(action);
};
