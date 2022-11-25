import React from "react";
import {message} from "antd";
import {useParams} from "react-router-dom";

import {
  useGetConfigByIdQuery,
  useUpdateConfigMutation,
} from "../../services/UserverService";
import ConfigForm from "../../components/ConfigForm/ConfigForm";
import MainLayout from "../../layouts/MainLayout/MainLayout";

const EditPage = () => {
  const {uuid} = useParams();

  const {data: dataConfigById, isLoading: isLoadingConfigById} =
    useGetConfigByIdQuery(uuid);

  const [updateConfig, {isLoading: isLoadingUpdateConfig}] =
    useUpdateConfigMutation();

  const initialValues = dataConfigById ? {
    ...dataConfigById,
    // костыли))))
    name: dataConfigById.config_name || dataConfigById.name,
    value: dataConfigById.config_value
  } : null;

  return <MainLayout>
    <ConfigForm
      isLoading={isLoadingConfigById}
      isSaveLoading={isLoadingConfigById || isLoadingUpdateConfig}
      mode="edit"
      onFinish={async data => {
        const {error} = await updateConfig({uuid, data});
        if (!error) {
          message.success("Сохранено");
        }
      }}
      initialValues={initialValues}
    />
  </MainLayout>;
};

export default EditPage;
