import {
  Alert, Button, Form, message, PageHeader, Popconfirm, Row, Space, Spin
} from "antd";
import styles from "../../pages/EditPage/styles.module.scss";
import ConfigFormFields from "../ConfigFormFields/ConfigFormFields";
import React, {useEffect, useState} from "react";

const modes = {
  create: {
    title: "Создать конфиг",
    fields: {
      name: true,
      service: true,
      value: true,
      initialValue: false
    }
  },
  edit: {
    title: "Редактировать конфиг",
    fields: {
      name: false,
      service: false,
      value: true,
      initialValue: true
    }
  },
  clone: {
    title: "Клонировать конфиг",
    fields: {
      name: false,
      service: true,
      value: false,
      initialValue: false
    }
  }
}

export default function ConfigForm(
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
    />) : (isLoading ? <Row align="middle">
        <Space className={styles.spinner}>
          <Spin/>
        </Space>
      </Row> :
      <ConfigFormFields initialValues={initialValues} form={form}
                        modeData={modeData}/>)}
  </Form>
}
