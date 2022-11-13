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
import EditVarFields from "../../components/EditVarFields/EditVarFields";
import EditVarForm from "../../components/EditVarForm/EditvarForm";

const {Header, Content, Footer} = Layout;

const EditPage = () => {

    const {id: uuid} = useParams();

    const {
        data: variableData,
        error: variableError,
        isLoading: isLoadingVariable,
    } = variableAPI.useFetchVariableByIdQuery(uuid);

    const [
        updateVariable, {
            error: updateError,
            isLoading: isUpdateLoading,
        }
    ] = variableAPI.useUpdateVariableMutation();

    return <>
        <Layout className={styles.layout}>
            <Header className={styles.header}>Динамические конфиги
                Userver</Header>
            <Content className={styles.content}>
                <EditVarForm
                    isLoading={isLoadingVariable}
                    isSaveLoading={isLoadingVariable || isUpdateLoading}
                    title="Редактировать переменную"
                    onFinish={updateVariable}
                    initialValues={variableData}
                />
            </Content>
            <Footer className={styles.footer}>Сделано с любовью ❤️
                2022</Footer>
        </Layout>
    </>;
};

export default EditPage;
