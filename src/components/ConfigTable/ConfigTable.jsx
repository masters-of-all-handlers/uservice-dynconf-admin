import React from "react";
import {Table, Space} from "antd";

import styles from "./styles.module.scss";
import {columns} from "./columns";

import {useGetConfigsQuery} from "../../services/VariableService";
import {useTable, rowKey, showTotal} from "../../hooks/useTable";

const getConfigsParams = (params) => ({
  limit: params.pagination?.pageSize,
  page: params.pagination?.current,
});

const ConfigTable = () => {
  const {tableParams, handleTableChange} = useTable();

  const {data, isFetching} = useGetConfigsQuery(getConfigsParams(tableParams));

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
          bordered
        />
      </Space>
    </>
  );
};

export default ConfigTable;
