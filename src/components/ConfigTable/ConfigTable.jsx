import React from "react";
import {Table} from "antd";

import styles from "./styles.module.scss";
import {getColumns} from "./columns";
import {expandedRowRender} from "./expandedRowRender";

import {useGetConfigsQuery} from "../../services/UserverService";
import {useTable, rowKey, showTotal} from "../../hooks/useTable";

const getConfigsParams = ({pagination, config, service}) => ({
  limit: pagination?.pageSize,
  page: pagination?.current,
  config,
  service,
});

const ConfigTable = () => {
  const {
    tableParams,
    handleTableChange,
    searchByConfigName,
    searchByServiceName,
  } = useTable();

  const {data, isFetching} = useGetConfigsQuery(getConfigsParams(tableParams));

  const columns = getColumns(
    isFetching,
    searchByConfigName,
    searchByServiceName
  );

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
      expandable={{
        expandedRowRender,
        expandRowByClick: true,
      }}
      size="middle"
      bordered
    />
  );
};

export default ConfigTable;
