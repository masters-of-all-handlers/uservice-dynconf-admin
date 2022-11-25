import React, {useState} from 'react';
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
    isLoading: isConfigLoading,
  } = useGetConfigByIdQuery(uuid);

  const [updateVariable, {isLoading: isUpdateLoading}] =
    variableAPI.useUpdateVariableMutation();

  const initialValues = configData ? {
    ...configData,
    // костыли))))
    name: configData.config_name || configData.name,
    value: configData.config_value
  } : null;

  return <MainLayout>
    <ConfigForm
      isLoading={isConfigLoading}
      isSaveLoading={isConfigLoading || isUpdateLoading}
      mode="edit"
      onFinish={async data => {
        const {error} = await updateVariable({uuid, ...data});
        if (!error) {
          message.success("Сохранено");
        }
      }}
      initialValues={initialValues}
    />
  </MainLayout>;
};

export default EditPage;
