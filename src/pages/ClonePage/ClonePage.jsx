import {message} from "antd";
import ConfigForm from "../../components/ConfigForm/ConfigForm";
import React from "react";
import {variableAPI} from "../../services/VariableService";
import {useParams} from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";

export default function ClonePage() {
  const {id: uuid} = useParams();

  const {
    data: variableData,
    error: variableError,
    isLoading: isLoadingVariable,
  } = variableAPI.useFetchVariableByIdQuery(uuid);

  const [
    cloneVariable, {
      error: cloneError,
      isLoading: isCloneLoading,
    }
  ] = variableAPI.useCloneVariableMutation();

  return <MainLayout><ConfigForm
    isLoading={isLoadingVariable}
    isSaveLoading={isLoadingVariable || isCloneLoading}
    mode="clone"
    onFinish={
      data => {
        console.log(data);
        cloneVariable(data).then(() => {
          message.success("Сохранено");
        })
      }
    }
    initialValues={variableData}
    error={variableError || cloneError}
  />
  </MainLayout>;
}
