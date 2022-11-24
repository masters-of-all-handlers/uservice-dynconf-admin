import React from "react";
import {Layout} from "antd";
import {Link} from "react-router-dom";

import styles from "./styles.module.scss";
import {DASHBOARD_CONFIGS_URL} from "../../constants";

import {ReactComponent as Logo} from "../../logo.svg";
import MainMenu from "../../components/MainMenu/MainMenu";
import useAuth from "../../hooks/useAuth";

const {Header, Content, Footer} = Layout;

const MainLayout = ({children}) => {
  const {data} = useAuth();
  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <Link className={styles.logo}
              to={data.ticket ? DASHBOARD_CONFIGS_URL : "/"}>
          <Logo className={styles.logo_img}/>
          <div className={styles.logo_desc}>Динамические конфиги userver</div>
        </Link>
        <MainMenu/>
      </Header>

      <Content className={styles.content}>{children}</Content>

      <Footer className={styles.footer}>2022 ❤️Сделано с любовью</Footer>
    </Layout>
  );
};

export default MainLayout;
