import React from "react";
import {message} from "antd";
import {useParams} from "react-router-dom";

import MainLayout from "../MainLayout/MainLayout";

import {variableAPI} from "../../services/VariableService";
import EditVarForm from "../../components/EditVarForm/EditvarForm";

const EditPage = () => {
  const {uuid} = useParams();

  const {
    data: variableData,
    error: variableError,
    isLoading: isLoadingVariable,
  } = variableAPI.useFetchVariableByIdQuery(uuid);

  const [updateVariable, {error: updateError, isLoading: isUpdateLoading}] =
    variableAPI.useUpdateVariableMutation();

  return (
    <MainLayout>
      <EditVarForm
        isLoading={isLoadingVariable}
        isSaveLoading={isLoadingVariable || isUpdateLoading}
        title="Редактировать переменную"
        onFinish={(data) => {
          updateVariable(data).then(() => {
            message.success("Сохранено");
          });
        }}
        initialValues={variableData}
        error={variableError || updateError}
      />
    </MainLayout>
  );
};

export default EditPage;
