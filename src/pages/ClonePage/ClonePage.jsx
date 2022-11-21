import {message} from "antd";
import ConfigForm from "../../components/ConfigForm/ConfigForm";
import React from "react";
import {variableAPI} from "../../services/VariableService";
import {useNavigate, useParams} from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import {DASHBOARD_CONFIGS_URL} from "../../constants";

export default function ClonePage() {
  const {uuid} = useParams();
  const navigate = useNavigate();

  const {
    data: variableData,
    error: variableError,
    isLoading: isLoadingVariable,
  } = variableAPI.useGetConfigByIdQuery(uuid);

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
        cloneVariable({uuid, service_name: data.service}).then(() => {
          if (!cloneError) {
            message.success("Сохранено");
            navigate(DASHBOARD_CONFIGS_URL);
          }
        })
      }
    }
    initialValues={
      {
        ...variableData,
        // костыли))))
        name: variableData?.config_name || variableData?.name,
        value: variableData?.config_value
      }
    }
    error={variableError || cloneError}
  />
  </MainLayout>;
}
