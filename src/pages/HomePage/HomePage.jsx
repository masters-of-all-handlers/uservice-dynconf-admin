import React from "react";
import {PageHeader, Button} from "antd";
import {useNavigate} from "react-router-dom";

import MainLayout from "../MainLayout/MainLayout";

import ConfigTable from "../../components/ConfigTable/ConfigTable";

const HomePage = () => {
  const navigate = useNavigate();

  const handleCreateClick = () => {
    navigate(`/create`);
  };

  return (
    <MainLayout>
      <PageHeader
        title="Список конфигов"
        extra={[
          <Button key="createConfig" type="primary" onClick={handleCreateClick}>
            Создать конфиг
          </Button>,
        ]}
      />

      <ConfigTable />
    </MainLayout>
  );
};

export default HomePage;
