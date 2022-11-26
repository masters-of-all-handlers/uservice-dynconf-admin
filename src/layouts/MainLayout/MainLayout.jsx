import React from "react";
import {Layout} from "antd";
import {Link} from "react-router-dom";
import classNames from "classnames";

import styles from "./styles.module.scss";

import {DASHBOARD_CONFIGS_URL, SITE_COPYRIGHT} from "../../constants";
import useAuth from "../../hooks/useAuth";
import MainMenu from "../../components/MainMenu/MainMenu";
import Logo from "../../components/Logo/Logo";

const {Header, Content, Footer} = Layout;

const getRootUrl = (ticket) => (Boolean(ticket) ? DASHBOARD_CONFIGS_URL : "/");

const MainLayout = ({type, children}) => {
  const {
    data: {ticket},
  } = useAuth();

  const layoutClassNames = classNames(styles.layout, {
    [styles.layout_branded]: type === "branded",
  });

  return (
    <Layout className={layoutClassNames}>
      <Header className={styles.header}>
        <Link className={styles.logo} to={getRootUrl(ticket)}>
          <Logo className={styles.logo_img} />
        </Link>

        <MainMenu />
      </Header>

      <Content className={styles.content}>{children}</Content>

      <Footer className={styles.footer}>{SITE_COPYRIGHT}</Footer>
    </Layout>
  );
};

export default MainLayout;
