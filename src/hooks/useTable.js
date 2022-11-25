import {useState} from "react";

const defaultParams = {
  pagination: {
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
  },

  s: "",
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

  const handleSearchByConfigName = (s) => {
    const oldTableParams = getLocalStorage();
    const newTableParams = {
      ...oldTableParams,

      pagination: {
        ...oldTableParams.pagination,

        current: 1,
      },

      s: s,
    };

    setLocalStorage(newTableParams);
    setTableParams(newTableParams);
  };

  return {
    tableParams,
    handleTableChange,

    searchByConfigName: {
      handle: handleSearchByConfigName,
      value: tableParams.s,
    },
  };
}

export const rowKey = (record) => record.uuid;
export const showTotal = (total) => `Всего: ${total}`;
