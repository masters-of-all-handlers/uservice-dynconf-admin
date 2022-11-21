import {Button, Col, Layout, Row, Space, Typography} from "antd";
import logo from "../../logo.svg";
import {useNavigate} from "react-router-dom";
import styles from "./styles.module.scss";

export default function LandingPage() {
  const navigate = useNavigate();
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
