import React from "react";
import {Button, Form, message, PageHeader, Popconfirm} from "antd";

import formModes from "./formModes";

import Spinner from "../Spinner/Spinner";
import ConfigFormFields from "../ConfigFormFields/ConfigFormFields";

import {usePopconfirm} from "../../hooks/usePopconfirm";

const handleOnFinishFailed = () => {
  message.error("Обнаружены ошибки в полях");
};

const ConfigForm = ({
  mode,
  initialValues,
  onFinish,
  isSaveLoading,
  isLoadingConfigById,
}) => {
  const [form] = Form.useForm();
  const clearPopconfirm = usePopconfirm();

  const modeData = formModes[mode];

  if (!modeData) {
    return message.error(`Режим работы формы ${mode} не существует`);
  }

  const handleConfirmClear = () => {
    clearPopconfirm.close();

    form.resetFields();
  };

  const pageHeaderExtra = [
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
  ];

  return (
    <>
      {isLoadingConfigById ? (
        <Spinner />
      ) : (
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
            extra={pageHeaderExtra}
          />
          <ConfigFormFields
            initialValues={initialValues}
            form={form}
            modeData={modeData}
          />
        </Form>
      )}
    </>
  );
};

export default ConfigForm;
