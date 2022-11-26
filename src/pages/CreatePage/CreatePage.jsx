import React from "react";
import {message} from "antd";
import {useNavigate} from "react-router-dom";

import {DASHBOARD_CONFIGS_URL} from "../../constants";
import {useCreateConfigMutation} from "../../services/UserverService";
import ConfigForm from "../../components/ConfigForm/ConfigForm";
import MainLayout from "../../layouts/MainLayout/MainLayout";

export default function CreatePage() {
  const navigate = useNavigate();

  const [createConfig, {isLoading: isLoadingCreateConfig}] =
    useCreateConfigMutation();

  const handleOnFinish = async (data) => {
    const {error} = await createConfig(data);

    if (!error) {
      message.success(
        `Конфиг ${data.config_name} успешно создан в сервисе ${data.service_name}`
      );

      navigate(DASHBOARD_CONFIGS_URL);
    }
  };

  return (
    <MainLayout>
      <ConfigForm
        initialValues={null}
        mode="create"
        isLoadingConfigById={false}
        isSaveLoading={isLoadingCreateConfig}
        onFinish={handleOnFinish}
      />
    </MainLayout>
  );
}
