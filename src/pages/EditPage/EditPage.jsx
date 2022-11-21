import React from 'react';
import {
  message,
} from 'antd';
import {useParams} from "react-router-dom";
import ConfigForm from "../../components/ConfigForm/ConfigForm";
import MainLayout from "../MainLayout/MainLayout";

import {
  variableAPI,
  useGetConfigByIdQuery,
} from "../../services/VariableService";

const EditPage = () => {
  const {uuid} = useParams();

  const {
    data: configData,
    error: configError,
    isLoading: isConfigLoading,
  } = useGetConfigByIdQuery(uuid);

  const [updateVariable, {error: updateError, isLoading: isUpdateLoading}] =
    variableAPI.useUpdateVariableMutation();

  return <MainLayout>
    <ConfigForm
      isLoading={isConfigLoading}
      isSaveLoading={isConfigLoading || isUpdateLoading}
      mode="edit"
      onFinish={(data) => {
        updateVariable({uuid, ...data}).then(() => {
          message.success("Сохранено");
        });
      }}
      initialValues={{
        ...configData,
        // костыли))))
        name: configData?.config_name || configData?.name,
        value: configData?.config_value
      }}
      error={configError || updateError}
    />
  </MainLayout>;
};

export default EditPage;
