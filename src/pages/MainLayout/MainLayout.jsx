import React from "react";
import {Layout} from "antd";
import {Link} from "react-router-dom";

import styles from "./styles.module.scss";
import {DASHBOARD_CONFIGS_URL} from "../../constants";

import {ReactComponent as Logo} from "../../logo.svg";
import MainMenu from "../../components/MainMenu/MainMenu";

const {Header, Content, Footer} = Layout;

const MainLayout = ({children}) => {
  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <Link className={styles.logo} to="/">
          <Logo className={styles.logo_img}/>
          <div className={styles.logo_desc}>Динамические конфиги userver</div>
        </Link>
        <MainMenu/>
      </Header>

      <Content className={styles.content}>{children}</Content>

      <Footer className={styles.footer}>&copy; 2022<br/>Сделано с любовью
        командой "Мастера на все ручки" ❤️</Footer>
    </Layout>
  );
};

export default MainLayout;
