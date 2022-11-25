import React from "react";
import {message} from "antd";
import {useNavigate} from "react-router-dom";

import {DASHBOARD_CONFIGS_URL} from "../../constants";
import {userverAPI} from "../../services/UserverService";
import ConfigForm from "../../components/ConfigForm/ConfigForm";
import MainLayout from "../../layouts/MainLayout/MainLayout";

export default function CreatePage() {
  const [createVariable, {isLoading: isCreateLoading}] =
  userverAPI.useCreateVariableMutation();
  const navigate = useNavigate();
  return (
    <MainLayout>
      <ConfigForm
        isLoading={false}
        isSaveLoading={isCreateLoading}
        mode="create"
        onFinish={async data => {
          const {error} = await createVariable(data);
          if (!error) {
            navigate(DASHBOARD_CONFIGS_URL);
            message.success("Сохранено");
          }
        }}
        initialValues={null}
      />
    </MainLayout>
  );
}
