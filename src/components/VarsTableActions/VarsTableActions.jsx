import React from 'react';
import { Space, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const VarsTableActions = ({ record }) => {
  return (
    <>
      <Space size="small">
        <Button
          type="primary"
          icon={<EditOutlined />}
          size="small"
          title="Редактировать"
        />

        <Button
          type="danger"
          icon={<DeleteOutlined />}
          size="small"
          title="Удалить"
        />
      </Space>
    </>
  );
};

export default VarsTableActions;
