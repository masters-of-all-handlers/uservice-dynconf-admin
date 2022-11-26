import React from "react";
import {PageHeader, Button} from "antd";
import {useNavigate} from "react-router-dom";

import {DASHBOARD_CONFIGS_CREATE_URL} from "../../constants";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import ConfigTable from "../../components/ConfigTable/ConfigTable";

const HomePage = () => {
  const navigate = useNavigate();

  const handleCreateClick = () => {
    navigate(DASHBOARD_CONFIGS_CREATE_URL);
  };

  return (
    <MainLayout>
      <PageHeader
        ghost={false}
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
