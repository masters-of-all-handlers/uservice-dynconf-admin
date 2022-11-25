import React from "react";
import {message} from "antd";
import {useNavigate, useParams} from "react-router-dom";

import {DASHBOARD_CONFIGS_URL} from "../../constants";
import {
  useGetConfigByIdQuery,
  useUpdateConfigMutation,
} from "../../services/UserverService";
import ConfigForm from "../../components/ConfigForm/ConfigForm";
import MainLayout from "../../layouts/MainLayout/MainLayout";

const EditPage = () => {
  const navigate = useNavigate();
  const {uuid} = useParams();

  const {data: dataConfigById, isLoading: isLoadingConfigById} =
    useGetConfigByIdQuery(uuid);

  const [updateConfig, {isLoading: isLoadingUpdateConfig}] =
    useUpdateConfigMutation();

  const initialValues = dataConfigById
    ? {
        ...dataConfigById,
        // ToDo синхронизировать параметры с новом API
        name: dataConfigById.config_name || dataConfigById.name,
        value: dataConfigById.config_value,
      }
    : null;

  const handleOnFinish = async (data) => {
    const {error} = await updateConfig({uuid, data});

    if (!error) {
      // ToDo добавить имя конфига в сообщение
      message.success("Конфиг успешно обновлен!");

      navigate(DASHBOARD_CONFIGS_URL);
    }
  };

  return (
    <MainLayout>
      <ConfigForm
        initialValues={initialValues}
        mode="edit"
        isLoading={isLoadingConfigById}
        isSaveLoading={isLoadingConfigById || isLoadingUpdateConfig}
        onFinish={handleOnFinish}
      />
    </MainLayout>
  );
};

export default EditPage;
