import React from "react";
import {Table} from "antd";

import styles from "./styles.module.scss";
import {getColumns} from "./columns";

import {useGetConfigsQuery} from "../../services/VariableService";
import {useTable, rowKey, showTotal} from "../../hooks/useTable";

const getConfigsParams = (params) => ({
  limit: params.pagination?.pageSize,
  page: params.pagination?.current,
  s: params?.s,
});

const ConfigTable = () => {
  const {tableParams, handleTableChange, handleSearch} = useTable();

  const {data, isFetching} = useGetConfigsQuery(getConfigsParams(tableParams));

  const columns = getColumns(handleSearch, isFetching);

  return (
    <Table
      className={styles.table}
      rowClassName={styles.row}
      rowKey={rowKey}
      dataSource={data?.items}
      columns={columns}
      loading={isFetching}
      pagination={{
        ...tableParams.pagination,
        total: data?.total,
        showTotal,
      }}
      onChange={handleTableChange}
      size="middle"
      bordered
    />
  );
};

export default ConfigTable;
