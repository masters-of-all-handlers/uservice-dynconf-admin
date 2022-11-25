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
      // ToDo добавить имя конфига в сообщение
      message.success("Конфиг успешно создан!");

      navigate(DASHBOARD_CONFIGS_URL);
    }
  };

  return (
    <MainLayout>
      <ConfigForm
        initialValues={null}
        mode="create"
        isLoading={false}
        isSaveLoading={isLoadingCreateConfig}
        onFinish={handleOnFinish}
      />
    </MainLayout>
  );
}
