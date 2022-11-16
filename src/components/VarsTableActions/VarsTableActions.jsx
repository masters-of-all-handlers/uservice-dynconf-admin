import React, {useState} from "react";
import {Button, Dropdown, Popconfirm, message} from "antd";
import {
  EllipsisOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {variableAPI} from "../../services/VariableService";

const VarsTableActions = ({render: {uuid}}) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [isOpenDeleteConfirm, setIsOpenDeleteConfirm] = useState(false);

  const [deleteVariableById, {isLoading: isLoadingDeleteVariableById}] =
    variableAPI.useDeleteVariableByIdMutation();

  const navigate = useNavigate();

  const openDropdown = () => {
    setIsOpenDropdown(true);
  };

  const closeDropdown = () => {
    setIsOpenDropdown(false);
  };

  const openDeleteConfirm = () => {
    setIsOpenDeleteConfirm(true);
  };

  const closeDeleteConfirm = () => {
    setIsOpenDeleteConfirm(false);
  };

  const handleConfirmDelete = async () => {
    const response = await deleteVariableById(uuid);

    closeDeleteConfirm();
    closeDropdown();

    if (response.hasOwnProperty("error")) {
      return message.error(
        `При удалении переменной ${uuid} произошла ошибка ${response.error.status}`
      );
    }

    message.success(`Переменная ${uuid} удалена`);
  };

  const handleCancelDelete = () => {
    setTimeout(() => {
      closeDeleteConfirm();
      closeDropdown();
    }, 0);
  };

  const handleDropdownOpenChange = (e) => {
    if (e === false && isOpenDeleteConfirm === false) closeDropdown();
  };

  const handleMenuClick = (e) => {
    const {key} = e;

    switch (key) {
      case "edit":
        navigate(`/edit/${uuid}`);
        break;

      case "delete":
        openDeleteConfirm();
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
            title="Удалить?"
            open={isOpenDeleteConfirm}
            onConfirm={handleConfirmDelete}
            okButtonProps={{loading: isLoadingDeleteVariableById}}
            onCancel={handleCancelDelete}
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
      open={isOpenDropdown}
      onOpenChange={handleDropdownOpenChange}
    >
      <Button
        type="text"
        icon={<EllipsisOutlined />}
        size="small"
        onClick={openDropdown}
      />
    </Dropdown>
  );
};

export default VarsTableActions;
