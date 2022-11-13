import React from 'react';
import { Button, Dropdown } from 'antd';
import {
  EllipsisOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

const menu = {
  items: [
    {
      key: 'edit',
      label: 'Редактировать',
      icon: <EditOutlined />,
    },
    {
      key: 'delete',
      label: 'Удалить',
      icon: <DeleteOutlined />,
      danger: true,
    },
  ],
};

const VarsTableActions = ({ render: { uuid } }) => {
  return (
    <Dropdown
      menu={{ ...menu, onClick: (e) => handleMenuClick(e, uuid) }}
      trigger="click"
    >
      <Button type="text" icon={<EllipsisOutlined />} size="small" />
    </Dropdown>
  );
};

export default VarsTableActions;
