import React from "react";
import {Button, Form, Input, message} from "antd";
import {useForm} from "antd/es/form/Form";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {Navigate, useNavigate} from "react-router-dom";

import {DASHBOARD_CONFIGS_URL} from "../../constants";
import {useLoginMutation} from "../../services/AuthService";
import useAuth from "../../hooks/useAuth";
import LogoSection from "../../components/LogoSection/LogoSection";
import MainLayout from "../../layouts/MainLayout/MainLayout";

const loginPrefix = <UserOutlined className="site-form-item-icon" />;
const loginRules = [{required: true, message: "Введите имя пользователя"}];

const passwordPrefix = <LockOutlined className="site-form-item-icon" />;
const passwordRules = [{required: true, message: "Введите пароль"}];

export default function LoginPage() {
  const [form] = useForm();
  const auth = useAuth();
  const navigate = useNavigate();

  const [login, {isLoading: isLoginLoading}] = useLoginMutation();

  const handleFinish = (data) => {
    login(data)
      .then(({data: authData}) => {
        auth.login(authData);

        if (authData.ticket) {
          navigate(DASHBOARD_CONFIGS_URL);
        }
      })
      .catch((e) => {
        message.error("Ошибка входа");
      });
  };

  if (auth.data.ticket) {
    return <Navigate to={DASHBOARD_CONFIGS_URL} />;
  }

  return (
    <MainLayout type="branded">
      <LogoSection title="Вход">
        <Form form={form} onFinish={handleFinish}>
          <Form.Item name="login" rules={loginRules}>
            <Input prefix={loginPrefix} placeholder="Имя пользователя" />
          </Form.Item>

          <Form.Item name="password" rules={passwordRules}>
            <Input
              prefix={passwordPrefix}
              type="password"
              placeholder="Пароль"
            />
          </Form.Item>

          <Button
            type="primary"
            block
            loading={isLoginLoading}
            htmlType="submit"
          >
            Войти
          </Button>
        </Form>
      </LogoSection>
    </MainLayout>
  );
}
