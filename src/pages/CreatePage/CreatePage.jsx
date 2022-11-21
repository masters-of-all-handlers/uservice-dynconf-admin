import {message} from "antd";
import ConfigForm from "../../components/ConfigForm/ConfigForm";
import React from "react";
import {useNavigate} from "react-router-dom";

import MainLayout from "../MainLayout/MainLayout";

import {variableAPI} from "../../services/VariableService";
import {DASHBOARD_CONFIGS_URL} from "../../constants";

export default function CreatePage() {
  const [createVariable, {isLoading: isCreateLoading}] =
    variableAPI.useCreateVariableMutation();
  const navigate = useNavigate();
  return (
    <MainLayout>
      <ConfigForm
        isLoading={false}
        isSaveLoading={isCreateLoading}
        mode="create"
        onFinish={(data) => {
          createVariable(data).then(() => {
            navigate(DASHBOARD_CONFIGS_URL);
            message.success("Сохранено");
          });
        }}
        initialValues={{}}
      />
    </MainLayout>
  );
}
