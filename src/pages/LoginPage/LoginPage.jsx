import {Button, Card, Form, Input, Layout} from "antd";
import styles from "./styles.module.scss";
import {ReactComponent as Logo} from "../../logo.svg";
import React from "react";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {useForm} from "antd/es/form/Form";

export default function LoginPage({props}) {
  const [form,] = useForm();
  return <Layout className={styles.layout}>
    <Card
      style={{width: 300}}>
      <div className={styles.cardHeader}>
        <Logo className={styles.logo}/>
        <h2 className={styles.cardTitle}>Вход</h2>
      </div>
      <Form form={form}>
        <Form.Item
          name="username"
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
        <Button type="primary" block>
          Войти
        </Button>
      </Form>
    </Card>
  </Layout>;
}
