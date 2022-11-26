import classNames from "classnames";

import {validateJSON, prettifyJSON, isJSONValid} from "../../utils/json";

export const rules = {
  configName: [
    {
      required: true,
      message: "Введите имя переменной",
    },
  ],

  serviceName: [
    {
      required: true,
      message: "Введите название сервиса",
    },
  ],

  configValue: [
    {
      required: true,
      message: "Введите значение",
    },

    {
      validator: validateJSON,
    },
  ],
};

export const getValuePropsConfigValue = (value) => {
  const fieldClassNames = classNames("ant-input", {
    "ant-input-status-error": !isJSONValid(value),
  });

  return {
    value: prettifyJSON(value),
    className: fieldClassNames,
  };
};
