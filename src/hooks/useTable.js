import {useState} from "react";

const defaultParams = {
  pagination: {
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
  },

  config: "",
  service: "",
};

const setLocalStorage = (params) => {
  const paramsJSON = JSON.stringify(params);

  localStorage.setItem("tableParams", paramsJSON);
};

const getLocalStorage = () => {
  const paramsJSON = localStorage.getItem("tableParams");
  const params = paramsJSON ? JSON.parse(paramsJSON) : defaultParams;

  return params;
};

export function useTable() {
  const defaultParams = getLocalStorage();

  const [tableParams, setTableParams] = useState(defaultParams);

  const handleTableChange = (pagination) => {
    const oldTableParams = getLocalStorage();
    const newTableParams = {
      ...oldTableParams,

      pagination: {
        ...oldTableParams.pagination,
        ...pagination,
      },
    };

    setLocalStorage(newTableParams);
    setTableParams(newTableParams);
  };

  const handleSearchByConfigName = (config) => {
    const oldTableParams = getLocalStorage();
    const newTableParams = {
      ...oldTableParams,

      pagination: {
        ...oldTableParams.pagination,

        current: 1,
      },

      config,
    };

    setLocalStorage(newTableParams);
    setTableParams(newTableParams);
  };

  const handleSearchByServiceName = (service) => {
    const oldTableParams = getLocalStorage();
    const newTableParams = {
      ...oldTableParams,

      pagination: {
        ...oldTableParams.pagination,

        current: 1,
      },

      service,
    };

    setLocalStorage(newTableParams);
    setTableParams(newTableParams);
  };

  return {
    tableParams,
    handleTableChange,

    searchByConfigName: {
      handle: handleSearchByConfigName,
      value: tableParams.config,
    },

    searchByServiceName: {
      handle: handleSearchByServiceName,
      value: tableParams.service,
    },
  };
}

export const rowKey = (record) => record.uuid;
export const showTotal = (total) => `Всего: ${total}`;
