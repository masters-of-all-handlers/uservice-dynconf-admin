import {
  Alert, Button, Form, message, PageHeader, Popconfirm, Row, Space, Spin
} from "antd";
import styles from "../../pages/EditPage/styles.module.scss";
import EditVarFields from "../EditVarFields/EditVarFields";
import React, {useEffect, useState} from "react";

export default function EditVarForm({
                                      title,
                                      initialValues,
                                      onFinish,
                                      isSaveLoading,
                                      isLoading,
                                      error
                                    }) {

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
      title={title}
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
        Сохранить изменения
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
          <Spin />
        </Space>
      </Row> : <EditVarFields initialValues={initialValues} form={form}/>)}
  </Form>
}
