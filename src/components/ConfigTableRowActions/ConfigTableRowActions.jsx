import React from "react";
import {Button, Dropdown, Popconfirm, message} from "antd";
import {
  EllipsisOutlined,
  EditOutlined,
  DeleteOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";

import {
  DASHBOARD_CONFIGS_EDIT_URL,
  DASHBOARD_CONFIGS_CLONE_URL,
} from "../../constants";

import {userverAPI} from "../../services/UserverService";
import {useDropdown} from "../../hooks/useDropdown";
import {usePopconfirm} from "../../hooks/usePopconfirm";

const ConfigTableRowActions = ({render: {uuid, config_name, name}}) => {
  // костыли))))
  name = config_name || name;
  const actionsDropdown = useDropdown();
  const deletePopconfirm = usePopconfirm();

  const navigate = useNavigate();

  const [deleteVariableById, {isLoading: isLoadingDeleteVariableById}] =
  userverAPI.useDeleteVariableByIdMutation();

  const handleConfirmDelete = async () => {
    const response = await deleteVariableById(uuid);

    deletePopconfirm.close();
    actionsDropdown.close();

    if (response.hasOwnProperty("error")) {
      return message.error(
        `При удалении конфига ${name} произошла ошибка ${response.error.status}`
      );
    }

    message.success(`Конфиг ${name} удален`);
  };

  const handleCancelDelete = () => {
    setTimeout(() => {
      deletePopconfirm.close();
      actionsDropdown.close();
    }, 0);
  };

  const handleDropdownOpenChange = (e) => {
    const isDropdownHidden = !Boolean(e);

    if (isDropdownHidden) {
      deletePopconfirm.close();
      actionsDropdown.close();
    }
  };

  const handleMenuItemClick = (e) => {
    const {key, domEvent} = e;

    domEvent.stopPropagation();

    switch (key) {
      case "edit":
        navigate(DASHBOARD_CONFIGS_EDIT_URL(uuid));
        break;

      case "clone":
        navigate(DASHBOARD_CONFIGS_CLONE_URL(uuid));
        break;

      case "delete":
        deletePopconfirm.open();
        break;

      default:
    }
  };

  const handleMenuClick = (e) => {
    e.stopPropagation();

    actionsDropdown.open();
  };

  const menu = {
    items: [
      {
        key: "edit",
        label: "Редактировать",
        icon: <EditOutlined />,
      },

      {
        key: "clone",
        label: "Клонировать",
        icon: <CopyOutlined />,
      },

      {
        key: "delete",
        label: (
          <Popconfirm
            title={`Удалить ${name}?`}
            open={deletePopconfirm.isOpen}
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
            okText="Да"
            okButtonProps={{
              loading: isLoadingDeleteVariableById,
              danger: true,
            }}
            cancelText="Нет"
          >
            Удалить
          </Popconfirm>
        ),
        icon: <DeleteOutlined />,
        danger: true,
      },
    ],

    onClick: handleMenuItemClick,
  };

  return (
    <Dropdown
      menu={menu}
      trigger="click"
      open={actionsDropdown.isOpen}
      onOpenChange={handleDropdownOpenChange}
    >
      <Button
        type="text"
        icon={<EllipsisOutlined />}
        size="small"
        onClick={handleMenuClick}
      />
    </Dropdown>
  );
};

export default ConfigTableRowActions;
