import React from "react";
import {message} from "antd";
import {useParams} from "react-router-dom";

import MainLayout from "../MainLayout/MainLayout";

import {
  variableAPI,
  useGetConfigByIdQuery,
} from "../../services/VariableService";
import EditVarForm from "../../components/EditVarForm/EditvarForm";

const EditPage = () => {
  const {uuid} = useParams();

  const {
    data: configData,
    error: configError,
    isLoading: isConfigLoading,
  } = useGetConfigByIdQuery(uuid);

  const [updateVariable, {error: updateError, isLoading: isUpdateLoading}] =
    variableAPI.useUpdateVariableMutation();

  return (
    <MainLayout>
      <EditVarForm
        isLoading={isConfigLoading}
        isSaveLoading={isConfigLoading || isUpdateLoading}
        title="Редактировать переменную"
        onFinish={(data) => {
          updateVariable(data).then(() => {
            message.success("Сохранено");
          });
        }}
        initialValues={configData}
        error={configError || updateError}
      />
    </MainLayout>
  );
};

export default EditPage;
