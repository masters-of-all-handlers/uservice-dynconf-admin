import React from "react";

import ConfigTableRowActions from "../ConfigTableRowActions/ConfigTableRowActions";
import TableTitleSearch from "../TableTitleSearch/TableTitleSearch";

const renderActions = (_, render) => <ConfigTableRowActions render={render} />;

export const getColumns = (
  isFetching,
  searchByConfigName,
  searchByServiceName
) => {
  return [
    {
      title: (
        <TableTitleSearch
          title="Имя"
          onSearch={searchByConfigName.handle}
          value={searchByConfigName.value}
          isFetching={isFetching}
        />
      ),
      dataIndex: "config_name",
      key: "config_name",
      width: "50%",
    },
    {
      title: (
        <TableTitleSearch
          title="Сервис"
          onSearch={searchByServiceName.handle}
          value={searchByServiceName.value}
          isFetching={isFetching}
        />
      ),
      dataIndex: "service_name",
      key: "service_name",
      width: "50%",
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
};
