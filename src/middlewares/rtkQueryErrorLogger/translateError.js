export const translateError = (message) => {
  const translate = {
    "Config variable already exists for that service":
      "Конфиг с таким именем уже существует для этого сервиса",

    "Service with that config_name already exists":
      "Сервис с таким именем конфига уже существует",
  };

  return translate[message] ? translate[message] : message;
};
