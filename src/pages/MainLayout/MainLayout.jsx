import React from "react";
import {Layout} from "antd";

import styles from "./styles.module.scss";

const {Header, Content, Footer} = Layout;

const MainLayout = ({children}) => {
  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>Динамические конфиги Userver</Header>

      <Content className={styles.content}>{children}</Content>

      <Footer className={styles.footer}>Сделано с любовью ❤️ 2022</Footer>
    </Layout>
  );
};

export default MainLayout;
