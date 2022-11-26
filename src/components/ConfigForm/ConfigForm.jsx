import React, {useEffect, useState} from "react";
import {
  Button,
  Form,
  message,
  PageHeader,
  Popconfirm,
  Row,
  Space,
  Spin,
} from "antd";

import formModes from "./formModes";
import styles from "./styles.module.scss";

import ConfigFormFields from "../ConfigFormFields/ConfigFormFields";

import {usePopconfirm} from "../../hooks/usePopconfirm";

const handleOnFinishFailed = () => {
  message.error("Обнаружены ошибки в полях");
};

export default function ConfigForm({
  mode,
  initialValues,
  onFinish,
  isSaveLoading,
  isLoading,
}) {
  const [form] = Form.useForm();
  const clearPopconfirm = usePopconfirm();

  const [initialValuesLoaded, setInitialValuesLoaded] = useState(false);

  useEffect(() => {
    if (!initialValuesLoaded && initialValues) {
      form.resetFields();
      setInitialValuesLoaded(true);
    }
  }, [initialValuesLoaded, form, initialValues]);

  const modeData = formModes[mode];

  if (!modeData) {
    return message.error(`Режим работы формы ${mode} не существует`);
  }

  const handleConfirmClear = () => {
    clearPopconfirm.close();

    form.resetFields();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={handleOnFinishFailed}
      initialValues={initialValues}
    >
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title={modeData.title}
        extra={[
          <Popconfirm
            key="clearForm"
            title="Сбросить форму?"
            open={clearPopconfirm.isOpen}
            onConfirm={handleConfirmClear}
            onCancel={clearPopconfirm.close}
          >
            <Button onClick={clearPopconfirm.open}>Cброс</Button>
          </Popconfirm>,

          <Button
            key="saveConfig"
            type="primary"
            htmlType="submit"
            loading={isSaveLoading}
          >
            Сохранить
          </Button>,
        ]}
      />

      {isLoading ? (
        <Row align="middle">
          <Space className={styles.spinner}>
            <Spin />
          </Space>
        </Row>
      ) : (
        <ConfigFormFields
          initialValues={initialValues || {}}
          form={form}
          modeData={modeData}
        />
      )}
    </Form>
  );
}
