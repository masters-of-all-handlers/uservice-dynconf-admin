import React from "react";
import {message} from "antd";

import {authAPI} from "../../services/AuthService";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import UserForm from "../../components/UserForm/UserForm";

export default function UserCreatePage() {
  const [register, {isLoading: isRegisterLoading}] =
    authAPI.useRegisterMutation();
  return <MainLayout>
    <UserForm
      mode="create"
      onFinish={
        async data => {
          const {error} = await register(data);
          if (!error) {
            message.success("Сохранено");
          }
        }
      }
      isLoading={false}
      isSaveLoading={isRegisterLoading}
      initialValues={null}
    />
  </MainLayout>
}
