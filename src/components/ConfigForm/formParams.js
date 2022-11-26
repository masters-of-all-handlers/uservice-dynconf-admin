export const formModes = {
  create: {
    title: "Создать конфиг",
    hasFields: {
      config_name: true,
      service_name: true,
      config_value: true,
    },
    hasInitialValue: false,
  },

  edit: {
    title: "Редактировать конфиг",
    hasFields: {
      config_name: false,
      service_name: false,
      config_value: true,
    },
    hasInitialValue: true,
  },

  clone: {
    title: "Клонировать конфиг",
    hasFields: {
      config_name: true,
      service_name: true,
      config_value: true,
    },
    hasInitialValue: true,
  },
};

export const formItemLayout = {
  labelCol: {
    span: 4,
  },

  wrapperCol: {
    span: 20,
  },
};
