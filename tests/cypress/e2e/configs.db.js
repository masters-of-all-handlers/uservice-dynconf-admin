import {v4} from "uuid";

let configs = [];
for (let i = 0; i < 150; ++i) {
  configs.push({
    config_name: `config ${i.toString()}`,
    config_value: i,
    service_name: `__default${(i % 2 || "").toString()}__`,
    uuid: v4()
  })
}

let services = ["service name", "service name 2"]
  .map(service_name => ({service_name}));

export const getConfigs = ({config, service} = {}) => {
  return configs
    .filter(conf => !config || conf.config_name.includes(config))
    .filter(conf => !service || conf.service_name.includes(service));
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
