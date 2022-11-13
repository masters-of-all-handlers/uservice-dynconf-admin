import React from 'react';
import {
  Alert,
  Layout, message,
} from 'antd';

import styles from './styles.module.scss';
import {variableAPI} from "../../services/VariableService";
import {useParams} from "react-router-dom";
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
          onFinish={
            data => {
              updateVariable(data).then(() => {
                message.success("Сохранено");
              })
            }
          }
          initialValues={variableData}
          error={variableError || updateError}
        />
      </Content>
      <Footer className={styles.footer}>Сделано с любовью ❤️
        2022</Footer>
    </Layout>
  </>;
};

export default EditPage;
