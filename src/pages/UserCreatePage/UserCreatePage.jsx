import MainLayout from "../MainLayout/MainLayout";
import React from "react";
import UserForm from "../../components/UserForm/UserForm";
import {message} from "antd";
import {authAPI} from "../../services/AuthService";

export default function UserCreatePage() {
  const [register, {isLoading: isRegisterLoading, error: registerError}] =
    authAPI.useRegisterMutation();
  return <MainLayout>
    <UserForm mode="create" onFinish={data => {
      register(data).then(() => {
        message.success("Сохранено");
      });
    }
    } isLoading={false}
              isSaveLoading={isRegisterLoading} error={registerError}
              initialValues={{}}/>
  </MainLayout>
}
