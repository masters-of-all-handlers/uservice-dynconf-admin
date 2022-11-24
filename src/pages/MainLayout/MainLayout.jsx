import React from "react";
import {Layout} from "antd";
import {Link} from "react-router-dom";

import styles from "./styles.module.scss";

import {
  DASHBOARD_CONFIGS_URL,
  SITE_NAME,
  SITE_COPYRIGHT,
} from "../../constants";
import {ReactComponent as Logo} from "../../logo.svg";
import useAuth from "../../hooks/useAuth";
import MainMenu from "../../components/MainMenu/MainMenu";

const {Header, Content, Footer} = Layout;

const MainLayout = ({children}) => {
  const {
    data: {ticket},
  } = useAuth();

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <Link className={styles.logo} to={ticket ? DASHBOARD_CONFIGS_URL : "/"}>
          <Logo className={styles.logo_img} />

          <div className={styles.logo_desc}>{SITE_NAME}</div>
        </Link>
        <MainMenu />
      </Header>

      <Content className={styles.content}>{children}</Content>

      <Footer className={styles.footer}>{SITE_COPYRIGHT}</Footer>
    </Layout>
  );
};

export default MainLayout;
