import {Layout, message} from "antd";
import styles from "../EditPage/styles.module.scss";
import EditVarForm from "../../components/EditVarForm/EditvarForm";
import React from "react";
import {Content, Footer, Header} from "antd/es/layout/layout";
import {variableAPI} from "../../services/VariableService";
import {useNavigate} from "react-router-dom";

export default function CreatePage() {
  const [createVariable, {
    isLoading: isCreateLoading
  }] = variableAPI.useCreateVariableMutation();
  const navigate = useNavigate();

  return <>
    <Layout className={styles.layout}>
      <Header className={styles.header}>Динамические конфиги
        Userver</Header>
      <Content className={styles.content}>
        <EditVarForm
          isLoading={false}
          isSaveLoading={isCreateLoading}
          title="Создать переменную"
          onFinish={data => {
            createVariable(data).then(() => {
              navigate("/");
              message.success("Сохранено");
            })
          }}
          initialValues={{}}
        />
      </Content>
      <Footer className={styles.footer}>Сделано с любовью ❤️
        2022</Footer>
    </Layout>
  </>;
}
