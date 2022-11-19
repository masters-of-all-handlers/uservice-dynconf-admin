import React from "react";
import {Layout, PageHeader, Button} from "antd";
import {useNavigate} from "react-router-dom";

import styles from "./styles.module.scss";

import ConfigTable from "../../components/ConfigTable/ConfigTable";

const {Header, Content, Footer} = Layout;

const HomePage = () => {
  const navigate = useNavigate();

  const handleCreateClick = (e) => {
    navigate(`/create`);
  };

  return (
    <>
      <Layout className={styles.layout}>
        <Header className={styles.header}>Динамические конфиги Userver</Header>

        <Content className={styles.content}>
          <PageHeader
            title="Список переменных"
            extra={[
              <Button
                key="createVar"
                type="primary"
                onClick={handleCreateClick}
              >
                Создать переменную
              </Button>,
            ]}
          />

          <ConfigTable />
        </Content>

        <Footer className={styles.footer}>Сделано с любовью ❤️ 2022</Footer>
      </Layout>
    </>
  );
};

export default HomePage;
