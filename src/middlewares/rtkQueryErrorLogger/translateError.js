export const translateError = (message) => {
  const translate = {
    "Config variable already exists for that service":
      "Конфиг с таким именем уже существует для этого сервиса",
  };

  return translate[message] ? translate[message] : message;
};
