import React from 'react';
import { Table } from 'antd';

import styles from './styles.module.scss';
import { sortByName } from './helpers';

import VarsTableActions from '../VarsTableActions/VarsTableActions';
import data from '../../__mocks__/data';

const { Column } = Table;

const VariablesTable = () => {
  return (
    <Table className={styles.table} dataSource={data} size="small">
      <Column
        title="Имя"
        dataIndex="name"
        key="name"
        sorter={sortByName}
        sortDirections={['descend']}
      />

      <Column title="Сервис" dataIndex="service" key="service" />

      <Column
        title="Действия"
        key="actions"
        align="right"
        render={(_, render) => <VarsTableActions render={render} />}
      />
    </Table>
  );
};

export default VariablesTable;
