import {Button, Col, Layout, Row, Typography} from "antd";
import logo from "../../logo.svg";
import {Navigate, useNavigate} from "react-router-dom";
import styles from "./styles.module.scss";
import useAuth from "../../hooks/useAuth";
import {DASHBOARD_CONFIGS_URL} from "../../constants";
import React from "react";

export default function LandingPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  if (auth.data.ticket) {
    return <Navigate to={DASHBOARD_CONFIGS_URL}/>;
  }
  return <Layout>
    <section className={styles.heroSection}
    >
      <div className={styles.heroSectionBg}/>
      <div className={styles.heroSectionFg}>
        <Row align="middle" className={styles.heroSectionRow}>
          <Row align="middle">
            <Col>
              <img src={logo} className={styles.heroSectionLogo} alt=""/>
            </Col>
            <Col>
              <Typography.Title
                level={2}
                className={styles.heroSectionTitle}>userver-dynconf<br/>admin</Typography.Title>
              <Button type="primary"
                      block
                      onClick={() => navigate("/login")}
                      size="large">Войти</Button>

            </Col>
          </Row>

        </Row>
      </div>
    </section>
  </Layout>
}
