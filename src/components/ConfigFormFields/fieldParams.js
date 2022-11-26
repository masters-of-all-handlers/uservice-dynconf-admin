import {validateJSON} from "../../utils/json";

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
