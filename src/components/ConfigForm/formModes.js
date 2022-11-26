const formModes = {
  create: {
    title: "Создать конфиг",
    fields: {
      config_name: true,
      service_name: true,
      config_value: true,
      initialValue: false,
    },
  },

  edit: {
    title: "Редактировать конфиг",
    fields: {
      config_name: false,
      service_name: false,
      config_value: true,
      initialValue: true,
    },
  },

  clone: {
    title: "Клонировать конфиг",
    fields: {
      config_name: true,
      service_name: true,
      config_value: true,
      initialValue: true,
    },
  },
};

export default formModes;
