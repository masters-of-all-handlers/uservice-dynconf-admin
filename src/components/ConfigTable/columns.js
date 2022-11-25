import React from "react";

import ConfigTableRowActions from "../ConfigTableRowActions/ConfigTableRowActions";
import TableTitleSearch from "../TableTitleSearch/TableTitleSearch";

const renderActions = (_, render) => <ConfigTableRowActions render={render} />;

export const getColumns = (searchByConfigName, isFetching) => {
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
      dataIndex: "name",
      key: "name",
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
};
