import React from 'react';
import { Button, Dropdown } from 'antd';
import {
  EllipsisOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const handleMenuClick = (e, uuid) => {
    const { key } = e;

    switch (key) {
      case 'edit':
        navigate(`/edit/${uuid}`);
        break;

      case 'delete':
        console.log(`Удаление параметра ${uuid}`);
        break;

      default:
    }
  };

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
