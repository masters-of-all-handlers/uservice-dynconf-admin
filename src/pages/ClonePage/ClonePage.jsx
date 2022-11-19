import {Layout, message} from "antd";
import styles from "../EditPage/styles.module.scss";
import ConfigForm from "../../components/ConfigForm/ConfigForm";
import React from "react";
import {Content, Footer, Header} from "antd/es/layout/layout";
import {variableAPI} from "../../services/VariableService";
import {useParams} from "react-router-dom";

export default function ClonePage() {
  const {id: uuid} = useParams();

  const {
    data: variableData,
    error: variableError,
    isLoading: isLoadingVariable,
  } = variableAPI.useFetchVariableByIdQuery(uuid);

  const [
    cloneVariable, {
      error: cloneError,
      isLoading: isCloneLoading,
    }
  ] = variableAPI.useCloneVariableMutation();

  return <>
    <Layout className={styles.layout}>
      <Header className={styles.header}>Динамические конфиги
        Userver</Header>
      <Content className={styles.content}>
        <ConfigForm
          isLoading={isLoadingVariable}
          isSaveLoading={isLoadingVariable || isCloneLoading}
          mode="clone"
          onFinish={
            data => {
              cloneVariable(data).then(() => {
                message.success("Сохранено");
              })
            }
          }
          initialValues={variableData}
          error={variableError || cloneError}
        />
      </Content>
      <Footer className={styles.footer}>Сделано с любовью ❤️
        2022</Footer>
    </Layout>
  </>;
}
