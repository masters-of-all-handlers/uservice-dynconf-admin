import {
  Alert,
  Button, Form,
  message,
  PageHeader,
  Popconfirm,
} from "antd";
import styles from "./styles.module.scss";
import React, {useEffect, useState} from "react";
import UserFormFields from "../UserFormFields/UserFormFields";
import Spinner from "../Spinner/Spinner";

const modes = {
  create: {
    title: "Создание пользователя",
    fields: {
      login: true,
      password: true
    }
  }
}


export default function UserForm(
  {
    mode,
    initialValues,
    onFinish,
    isSaveLoading,
    isLoading,
    error
  }
) {
  const [form] = Form.useForm();
  const [popconfirmOpen, setPopconfirmOpen] = useState(false);

  const handlePopconfirmCancel = () => {
    setPopconfirmOpen(false);
  }

  const handlePopconfirmConfirm = () => {
    setPopconfirmOpen(false);
    form.resetFields();
  }

  const handlePopconfirmOpen = () => {
    setPopconfirmOpen(true);
  }

  useEffect(() => {
    if (initialValues) {
      form.resetFields();
    }
  }, [initialValues, form]);

  const modeData = modes[mode];

  if (!modeData) {
    return "404!";
  }

  return <Form
    form={form}
    layout="vertical"
    onFinish={onFinish}
    onFinishFailed={() => {
      message.error("Обнаружены ошибки в полях");
    }}
    initialValues={initialValues}
  >
    <PageHeader
      ghost={false}
      onBack={() => window.history.back()}
      title={modeData.title}
      extra={[<Popconfirm
        key="2"
        title="Сбросить форму?"
        open={popconfirmOpen}
        onConfirm={handlePopconfirmConfirm}
        onCancel={handlePopconfirmCancel}
      >
        <Button
          onClick={handlePopconfirmOpen}>Cброс</Button>
      </Popconfirm>, <Button key="1" type="primary" htmlType="submit"
                             loading={isSaveLoading}>
        Сохранить
      </Button>,]}
    />
    {error ? (<Alert
      message={`Произошла ошибка ${error.status}`}
      type="error"
      showIcon
      closable
      className={styles.alert}
    />) : (isLoading ? <Spinner /> :
      <UserFormFields initialValues={initialValues} form={form}
                      modeData={modeData}/>)}
  </Form>
}
