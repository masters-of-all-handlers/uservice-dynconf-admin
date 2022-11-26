import {v4} from "uuid";

let configs = [
  {
    config_name: "config 1",
    service_name: "__default__",
    uuid: "00000000-0000-0000-0000-000000000001",
    config_value: 1
  },
  {
    config_name: "config 2",
    service_name: "__default2__",
    uuid: "00000000-0000-0000-0000-000000000002",
    config_value: 2
  },
];

let services = ["service name", "service name 2"]
  .map(service_name => ({service_name}));

export const getConfigs = () => {
  return configs;
}

export const getConfig = (uuid) => {
  return configs.filter(x => x, uuid === uuid)[0];
}

export const deleteConfig = (uuid) => {
  configs = configs.filter(item => item.uuid !== uuid);
}

export const createConfig = (data) => {
  configs.push({...data, uuid: v4()});
}

const findConfig = (data) => {
  return configs.findIndex(conf => conf.config_name === data.config_name && conf.service_name === data.service_name);
}

export const cloneConfig = (data) => {
  const existing = findConfig(data);
  if (existing > -1) {
    Object.assign(configs[existing], data);
  } else {
    configs.push({...data, uuid: v4()});
  }
}

export const editConfig = (data) => {
  const existing = findConfig(data);
  if (existing > -1) {
    Object.assign(configs[existing], data);
  }
}

export const getServices = () => {
  return services;
}
