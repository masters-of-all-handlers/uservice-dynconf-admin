import {useState} from "react";

export function useTable(initialParams = {}) {
  const defaultParams = {
    ...initialParams,

    pagination: {
      current: 1,
      pageSize: 10,
      showSizeChanger: true,
      ...initialParams?.pagination,
    },
  };

  const [tableParams, setTableParams] = useState(defaultParams);

  const handleTableChange = (pagination) => {
    setTableParams({
      ...tableParams,

      pagination: {
        ...pagination,
      },
    });
  };

  const handleSearch = (s) => {
    setTableParams({
      ...tableParams,

      pagination: {
        ...tableParams.pagination,
      },

      s: s,
    });
  };

  return {tableParams, handleTableChange, handleSearch};
}

export const rowKey = (record) => record.uuid;
export const showTotal = (total) => `Всего: ${total}`;
