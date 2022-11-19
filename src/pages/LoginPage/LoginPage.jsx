import {Button, Card, Form, Input, Layout} from "antd";
import styles from "./styles.module.scss";
import {ReactComponent as Logo} from "../../logo.svg";
import React from "react";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {useForm} from "antd/es/form/Form";
import {authAPI} from "../../services/AuthService";

export default function LoginPage() {
  const [form,] = useForm();
  const [login, {
    data: loginData, /*error: loginError,*/ isLoading: isLoginLoading,
  }] = authAPI.useLoginMutation();
  const handleFinish = data => {
    login(data).then(() => {
      console.log(loginData);
    });
  }
  return <Layout className={styles.layout}>
    <Card
      style={{width: 300}}>
      <div className={styles.cardHeader}>
        <Logo className={styles.logo}/>
        <h2 className={styles.cardTitle}>Вход</h2>
      </div>
      <Form
        form={form}
        onFinish={handleFinish}
      >
        <Form.Item
          name="login"
          rules={[{required: true, message: 'Введите имя пользователя'}]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon"/>}
                 placeholder="Имя пользователя"/>
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{required: true, message: 'Введите пароль'}]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon"/>}
            type="password"
            placeholder="Пароль"
          />
        </Form.Item>
        <Button type="primary" block loading={isLoginLoading} htmlType="submit">
          Войти
        </Button>
      </Form>
    </Card>
  </Layout>;
}
