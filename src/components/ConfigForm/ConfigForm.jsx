import {
  Button, Form, message, PageHeader, Popconfirm, Row, Space, Spin
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
      name: true,
      service: true,
      value: true,
      initialValue: true
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
  }
) {

  const [form] = Form.useForm();
  const [popconfirmOpen, setPopconfirmOpen] = useState(false);
  const [initialValuesLoaded, setInitialValuesLoaded] = useState(false);

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
    if (!initialValuesLoaded && initialValues) {
      form.resetFields();
      setInitialValuesLoaded(true);
    }
  }, [initialValuesLoaded, form, initialValues]);

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
    {isLoading ? <Row align="middle">
        <Space className={styles.spinner}>
          <Spin/>
        </Space>
      </Row> :
      <ConfigFormFields initialValues={initialValues || {}} form={form}
                        modeData={modeData}/>}
  </Form>
}
