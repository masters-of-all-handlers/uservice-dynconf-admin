import React from "react";
import {message} from "antd";
import {useNavigate} from "react-router-dom";

import MainLayout from "../MainLayout/MainLayout";

import EditVarForm from "../../components/EditVarForm/EditvarForm";
import {variableAPI} from "../../services/VariableService";

export default function CreatePage() {
  const [createVariable, {isLoading: isCreateLoading}] =
    variableAPI.useCreateVariableMutation();
  const navigate = useNavigate();

  return (
    <MainLayout>
      <EditVarForm
        isLoading={false}
        isSaveLoading={isCreateLoading}
        title="Создать переменную"
        onFinish={(data) => {
          createVariable(data).then(() => {
            navigate("/");
            message.success("Сохранено");
          });
        }}
        initialValues={{}}
      />
    </MainLayout>
  );
}
