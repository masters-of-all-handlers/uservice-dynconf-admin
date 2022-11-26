import React from "react";
import {message} from "antd";
import {useNavigate, useParams} from "react-router-dom";

import {DASHBOARD_CONFIGS_URL} from "../../constants";
import {
  useGetConfigByIdQuery,
  useCloneConfigMutation,
} from "../../services/UserverService";
import ConfigForm from "../../components/ConfigForm/ConfigForm";
import MainLayout from "../../layouts/MainLayout/MainLayout";

export default function ClonePage() {
  const navigate = useNavigate();
  const {uuid} = useParams();

  const {data: dataConfigById, isLoading: isLoadingConfigById} =
    useGetConfigByIdQuery(uuid);

  const [cloneConfig, {isLoading: isLoadingCloneConfig}] =
    useCloneConfigMutation();

  const handleOnFinish = async (data) => {
    const {error} = await cloneConfig({
      uuid,
      data,
    });

    if (!error) {
      message.success(`Конфиг ${data.config_name} успешно клонирован`);

      navigate(DASHBOARD_CONFIGS_URL);
    }
  };

  return (
    <MainLayout>
      <ConfigForm
        initialValues={dataConfigById}
        mode="clone"
        isLoadingConfigById={isLoadingConfigById}
        isSaveLoading={isLoadingConfigById || isLoadingCloneConfig}
        onFinish={handleOnFinish}
      />
    </MainLayout>
  );
}
