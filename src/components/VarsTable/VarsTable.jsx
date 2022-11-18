import React from "react";
import {Table, Space} from "antd";

import styles from "./styles.module.scss";

import VarsTableActions from "../VarsTableActions/VarsTableActions";
import {useFetchAllVariablesQuery} from "../../services/VariableService";

const {Column} = Table;

const VariablesTable = () => {
  const {data: dataVariables, isFetching: isFetchingVariables} =

  const renderColumnActions = (_, render) => (
    <VarsTableActions render={render} />
  );

  return (
    <>
      <Space direction="vertical" size="middle" className={styles.wrap}>
        <Table
          rowKey={(record) => record.uuid}
          rowClassName={styles.row}
          dataSource={dataVariables && dataVariables.items}
          loading={isLoadingVariables}
          size="small"
          bordered
        >
          <Column title="Имя" dataIndex="config_name" key="name" width="100" />

          <Column
            title="Сервис"
            dataIndex="service"
            key="service"
            ellipsis={true}
            width="100"
          />

          <Column
            title="Действия"
            key="actions"
            align="right"
            render={renderColumnActions}
            width="100px"
          />
        </Table>
      </Space>
    </>
  );
};

export default VariablesTable;
