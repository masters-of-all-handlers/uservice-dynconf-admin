import React from 'react';
import { Table, Space, Alert } from 'antd';

import styles from './styles.module.scss';

import VarsTableActions from '../VarsTableActions/VarsTableActions';
import { variableAPI } from '../../services/VariableService';

const { Column } = Table;

const VariablesTable = () => {
  const {
    data: dataVariables,
    error: errorVariables,
    isLoading: isLoadingVariables,
  } = variableAPI.useFetchAllVariablesQuery(5);

  const renderColumnActions = (_, render) => (
    <VarsTableActions render={render} />
  );

  return (
    <>
      <Space direction="vertical" size="middle" className={styles.wrap}>
        {errorVariables && (
          <Alert
            message={`Произошла ошибка ${errorVariables.status} при загрузке`}
            type="error"
            showIcon
            closable
          />
        )}

        <Table
          rowKey={(record) => record.uuid}
          dataSource={dataVariables && dataVariables.items}
          loading={isLoadingVariables}
          size="small"
        >
          <Column title="Имя" dataIndex="name" key="name" width="60%" />

          <Column
            title="Сервис"
            dataIndex="service"
            key="service"
            width="20%"
          />

          <Column
            title="Действия"
            key="actions"
            align="right"
            width="20%"
            render={renderColumnActions}
          />
        </Table>
      </Space>
    </>
  );
};

export default VariablesTable;
