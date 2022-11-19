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
              <img src={logo} className={styles.heroSectionLogo}/>
            </Col>
            <Col>
              <Typography.Title level={2}>userver-dynconf<br/>admin</Typography.Title>
              <Space wrap>
                <Button type="primary"
                        onClick={() => navigate("/register")}
                        size="large">Зарегистрироваться</Button>
                <Button onClick={() => navigate("/login")}
                        size="large">Войти</Button>
              </Space>

            </Col>
          </Row>

        </Row>
      </div>
    </section>
  </Layout>
}
