export const prettifyJSON = (json) => {
  try {
    return JSON.stringify(JSON.parse(json), null, 2);
  } catch (e) {
    if (json) {
      return json;
    }

    return "";
  }
};

export const isJSONValid = (json) => {
  try {
    JSON.parse(json);

    return true;
  } catch (e) {
    return false;
  }
};

export const validateJSON = (_, value) =>
  new Promise((resolve, reject) => {
    if (isJSONValid(value)) {
      resolve();
    } else {
      reject("Значение должно быть валидным JSON");
    }
  });
