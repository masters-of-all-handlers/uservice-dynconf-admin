import React from "react";
import {Layout} from "antd";
import {Link} from "react-router-dom";

import styles from "./styles.module.scss";

import {ReactComponent as Logo} from "../../logo.svg";
import MainMenu from "../../components/MainMenu/MainMenu";

const {Header, Content, Footer} = Layout;

const MainLayout = ({children}) => {
  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <Link to="/">
          <Logo className={styles.logo} />
        </Link>

        <MainMenu />
      </Header>

      <Content className={styles.content}>{children}</Content>

      <Footer className={styles.footer}>Сделано с любовью ❤️ 2022</Footer>
    </Layout>
  );
};

export default MainLayout;
