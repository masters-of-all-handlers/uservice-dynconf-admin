import React from "react";

import VarsTableActions from "../VarsTableActions/VarsTableActions";

const renderActions = (_, render) => <VarsTableActions render={render} />;

export const columns = [
  {
    title: "Имя",
    dataIndex: "config_name",
    key: "config_name",
    width: "70%",
  },
  {
    title: "Сервис",
    dataIndex: "service",
    key: "service",
    width: "30%",
    ellipsis: true,
  },
  {
    title: "Действия",
    key: "actions",
    align: "right",
    width: "100px",
    render: renderActions,
  },
];
