import React from "react";
import {Table, Space} from "antd";

import styles from "./styles.module.scss";
import {columns} from "./columns";

import {useFetchAllConfigsQuery} from "../../services/VariableService";
import {useTable, rowKey, showTotal} from "../../hooks/useTable";

const getVariablesParams = (params) => ({
  limit: params.pagination?.pageSize,
  offset: (params.pagination?.current - 1) * params.pagination?.pageSize,
});

const ConfigTable = () => {
  const {tableParams, handleTableChange} = useTable();

  const {data, isFetching} = useFetchAllConfigsQuery(
    getVariablesParams(tableParams)
  );

  return (
    <>
      <Space className={styles.wrap} direction="vertical" size="middle">
        <Table
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
          size="small"
          bordered
        />
      </Space>
    </>
  );
};

export default ConfigTable;
