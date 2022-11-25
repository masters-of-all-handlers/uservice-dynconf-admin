import MainLayout from "../MainLayout/MainLayout";
import React from "react";
import UserForm from "../../components/UserForm/UserForm";
import {message} from "antd";
import {authAPI} from "../../services/AuthService";

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
