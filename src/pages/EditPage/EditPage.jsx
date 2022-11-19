import React from 'react';
import {
  Layout, message,
} from 'antd';
import {variableAPI} from "../../services/VariableService";
import {useParams} from "react-router-dom";
import ConfigForm from "../../components/ConfigForm/ConfigForm";
import MainLayout from "../MainLayout/MainLayout";

const EditPage = () => {

  const {id: uuid} = useParams();

  const {
    data: variableData,
    error: variableError,
    isLoading: isLoadingVariable,
  } = variableAPI.useFetchVariableByIdQuery(uuid);

  const [
    updateVariable, {
      error: updateError,
      isLoading: isUpdateLoading,
    }
  ] = variableAPI.useUpdateVariableMutation();

  return <MainLayout>
    <ConfigForm
      isLoading={isLoadingVariable}
      isSaveLoading={isLoadingVariable || isUpdateLoading}
      mode="edit"
      onFinish={
        data => {
          updateVariable(data).then(() => {
            message.success("Сохранено");
          })
        }
      }
      initialValues={variableData}
      error={variableError || updateError}
    />
  </MainLayout>;
};

export default EditPage;
