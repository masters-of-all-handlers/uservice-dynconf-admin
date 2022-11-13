import React, { useState } from 'react';
import { Table, Input, Space } from 'antd';

import styles from './styles.module.scss';
import { sortByName, filterByName } from './helpers';

import VarsTableActions from '../VarsTableActions/VarsTableActions';
import data from '../../__mocks__/data';

const { Column } = Table;

const VariablesTable = () => {
  const [dataSource, setDataSource] = useState(data);
  const [searchText, setSearchText] = useState('');

  const handleFilterByName = (e) => {
    const text = e.target.value.toLowerCase();
    setSearchText(text);

    const filteredData = filterByName(text, data);
    setDataSource(filteredData);
  };

  const renderColumnActions = (_, render) => (
    <VarsTableActions render={render} />
  );

  return (
    <>
      <Space direction="vertical" size="middle" className={styles.wrap}>
        <Input
          placeholder="Поиск по имени"
          value={searchText}
          onChange={handleFilterByName}
        />

        <Table dataSource={dataSource} size="small">
          <Column
            title="Имя"
            dataIndex="name"
            key="name"
            width="60%"
            // sorter={sortByName}
            // sortDirections={['descend']}
          />

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
