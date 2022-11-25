let configs = [
  {
    config_name: "config 1",
    service: "__default__",
    uuid: "00000000-0000-0000-0000-000000000001",
    config_value: 1
  },
  {
    config_name: "config 2",
    service: "__default2__",
    uuid: "00000000-0000-0000-0000-000000000002",
    config_value: 2
  },
];

export const getConfigs = () => {
  return configs;
}

export const getConfig = (uuid) => {
  return configs.filter(x => x, uuid === uuid)[0];
}

export const deleteConfig = (uuid) => {
  configs = configs.filter(item => item.uuid !== uuid);
}
