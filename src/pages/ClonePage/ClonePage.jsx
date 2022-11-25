import React from "react";
import {message} from "antd";
import {useNavigate, useParams} from "react-router-dom";

import {DASHBOARD_CONFIGS_URL} from "../../constants";
import {
  userverAPI,
  useCloneConfigMutation,
} from "../../services/UserverService";
import ConfigForm from "../../components/ConfigForm/ConfigForm";
import MainLayout from "../../layouts/MainLayout/MainLayout";

export default function ClonePage() {
  const {uuid} = useParams();
  const navigate = useNavigate();

  const {
    data: variableData,
    isLoading: isLoadingVariable,
  } = userverAPI.useGetConfigByIdQuery(uuid);

  const [cloneConfig, {isLoading: isLoadingCloneConfig}] =
    useCloneConfigMutation();

  const initialValues = variableData ? {
    ...variableData,
    // костыли))))
    name: variableData?.config_name || variableData?.name,
    value: variableData?.config_value
  } : null;

  return <MainLayout><ConfigForm
    isLoading={isLoadingVariable}
    isSaveLoading={isLoadingVariable || isLoadingCloneConfig}
    mode="clone"
    onFinish={
      async data => {
        if (initialValues.name === data.name && initialValues.service === data.service) {
          return message.error("Пожалуйста, измените название сервиса и/или конфига");
        }
        const {error} = await cloneConfig({
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
