import {message} from "antd";
import ConfigForm from "../../components/ConfigForm/ConfigForm";
import React, {useState} from "react";
import {variableAPI} from "../../services/VariableService";
import {useNavigate, useParams} from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import {DASHBOARD_CONFIGS_URL} from "../../constants";

export default function ClonePage() {
  const {uuid} = useParams();
  const navigate = useNavigate();

  const {
    data: variableData,
    isLoading: isLoadingVariable,
  } = variableAPI.useGetConfigByIdQuery(uuid);

  const [
    cloneVariable, {
      isLoading: isCloneLoading,
    }
  ] = variableAPI.useCloneVariableMutation();

  const initialValues = variableData ? {
    ...variableData,
    // костыли))))
    name: variableData?.config_name || variableData?.name,
    value: variableData?.config_value
  } : null;

  return <MainLayout><ConfigForm
    isLoading={isLoadingVariable}
    isSaveLoading={isLoadingVariable || isCloneLoading}
    mode="clone"
    onFinish={
      async data => {
        if (initialValues.name === data.name && initialValues.service === data.service) {
          return message.error("Пожалуйста, измените название сервиса и/или конфига");
        }
        const {error} = await cloneVariable({
          uuid,
          service: data.service,
          config_name: data.name,
          config_value: data.value
        });

        if (!error) {
          message.success("Сохранено");
          navigate(DASHBOARD_CONFIGS_URL);
        }
      }
    }
    initialValues={initialValues}
  />
  </MainLayout>;
}
