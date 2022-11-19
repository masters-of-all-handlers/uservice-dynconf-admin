import React from "react";

import ConfigTableRowActions from "../ConfigTableRowActions/ConfigTableRowActions";

const renderActions = (_, render) => <ConfigTableRowActions render={render} />;

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
