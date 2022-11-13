import {Button, Form, PageHeader, Popconfirm, Row, Space, Spin} from "antd";
import styles from "../../pages/EditPage/styles.module.scss";
import EditVarFields from "../EditVarFields/EditVarFields";
import React, {useEffect, useState} from "react";
import {LoadingOutlined} from "@ant-design/icons";

export default function EditVarForm(
    {
        title,
        initialValues,
        onFinish,
        isSaveLoading,
        isLoading
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
    }, [initialValues]);

    return <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={initialValues}
    >
        <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title={title}
            extra={[
                <Popconfirm
                    title="Сбросить форму?"
                    open={popconfirmOpen}
                    onConfirm={handlePopconfirmConfirm}
                    onCancel={handlePopconfirmCancel}
                >
                    <Button key="2"
                            onClick={handlePopconfirmOpen}>Cброс</Button>
                </Popconfirm>
                ,
                <Button key="1" type="primary" htmlType="submit"
                        loading={isSaveLoading}>
                    Сохранить изменения
                </Button>,]}
        />
        {isLoading ?
            <Row align="middle">
                <Space className={styles.spinner}>
                    <Spin
                        indicator={
                            <LoadingOutlined style={{fontSize: "60px"}} spin/>
                        }
                    />
                </Space>
            </Row> :
            <EditVarFields initialValues={initialValues}/>
        }
    </Form>
}
