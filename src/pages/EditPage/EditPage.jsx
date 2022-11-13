import React, {useEffect, useState} from 'react';
import {
    Button,
    Layout,
    PageHeader,
    Form,
    Input,
    Col,
    Row,
    Spin,
    Space, Popconfirm
} from 'antd';

import styles from './styles.module.scss';
import {variableAPI} from "../../services/VariableService";
import {useParams} from "react-router-dom";
import {LoadingOutlined} from "@ant-design/icons";
import EditVarFields from "../../components/EditVarForm/EditVarFields";

const {Header, Content, Footer} = Layout;

const EditPage = () => {
    const [form] = Form.useForm();

    const {id: uuid} = useParams();

    const {
        data: variableData,
        error: variableError,
        isLoading: isLoadingVariable,
    } = variableAPI.useFetchVariableByIdQuery(uuid);

    useEffect(() => {
        if (variableData) {
            form.resetFields();
        }
    }, [variableData]);

    const renderSpin = ({color, fontSize}) => {
        const icon = <LoadingOutlined style={{fontSize, color}} spin/>;
        return <Spin indicator={icon}/>
    }

    const [
        updateVariable, {
            error: updateError,
            isLoading: isUpdateLoading,
        }
    ] = variableAPI.useUpdateVariableMutation();

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

    return <>
        <Layout className={styles.layout}>
            <Header className={styles.header}>Динамические конфиги
                Userver</Header>
            <Content className={styles.content}>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={updateVariable}
                    initialValues={variableData}
                >
                    <PageHeader
                        ghost={false}
                        onBack={() => window.history.back()}
                        title="Редактирование переменной"
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
                                    loading={isLoadingVariable || isUpdateLoading}>
                                Сохранить изменения
                            </Button>,]}
                    />
                    {isLoadingVariable ?
                        <Row align="middle">
                            <Space className={styles.spinner}>
                                {renderSpin({fontSize: 60})}
                            </Space>
                        </Row> :
                        <EditVarFields initialValues={variableData}/>
                    }
                </Form>
            </Content>
            <Footer className={styles.footer}>Сделано с любовью ❤️
                2022</Footer>
        </Layout>
    </>;
};

export default EditPage;
