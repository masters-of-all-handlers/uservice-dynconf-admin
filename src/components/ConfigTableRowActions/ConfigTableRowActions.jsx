import React from "react";
import {Button, Dropdown, Popconfirm, message} from "antd";
import {
  EllipsisOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";

import {variableAPI} from "../../services/VariableService";
import {useDropdown} from "../../hooks/useDropdown";
import {usePopconfirm} from "../../hooks/usePopconfirm";

const ConfigTableRowActions = ({render: {uuid, config_name: name}}) => {
  const actionsDropdown = useDropdown();
  const deletePopconfirm = usePopconfirm();

  const navigate = useNavigate();

  const [deleteVariableById, {isLoading: isLoadingDeleteVariableById}] =
    variableAPI.useDeleteVariableByIdMutation();

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

  const handleMenuClick = (e) => {
    const {key} = e;

    switch (key) {
      case "edit":
        navigate(`/edit/${uuid}`);
        break;

      case "delete":
        deletePopconfirm.open();
        break;

      default:
    }
  };

  const menu = {
    items: [
      {
        key: "edit",
        label: "Редактировать",
        icon: <EditOutlined />,
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
    onClick: handleMenuClick,
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
        onClick={actionsDropdown.open}
      />
    </Dropdown>
  );
};

export default ConfigTableRowActions;
