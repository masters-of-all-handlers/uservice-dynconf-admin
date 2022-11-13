import {Layout} from "antd";
import styles from "../EditPage/styles.module.scss";
import EditVarForm from "../../components/EditVarForm/EditvarForm";
import React from "react";
import {Content, Footer, Header} from "antd/es/layout/layout";

export default function CreatePage() {
    const isCreateLoading = false, createVariable = () => {
    }
    return <>
        <Layout className={styles.layout}>
            <Header className={styles.header}>Динамические конфиги
                Userver</Header>
            <Content className={styles.content}>
                <EditVarForm
                    isLoading={false}
                    isSaveLoading={isCreateLoading}
                    title="Создать переменную"
                    onFinish={createVariable}
                    initialValues={{}}
                />
            </Content>
            <Footer className={styles.footer}>Сделано с любовью ❤️
                2022</Footer>
        </Layout>
    </>;
}
