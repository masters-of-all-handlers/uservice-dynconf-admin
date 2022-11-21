import {Button, Col, Layout, Row, Space, Typography} from "antd";
import {Link, useNavigate} from "react-router-dom";
import styles from "./styles.module.scss";
import {ReactComponent as Logo} from "../../logo.svg";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return <Layout className={styles.layout}>
    <Row align="middle" className={styles.logoRow}>
      <Col>
        <Logo className={styles.logo}/>
      </Col>
      <Col>
        <Typography.Title className={styles.notFound404}>404</Typography.Title>
      </Col>
    </Row>
    <Typography.Title level={4}>По этому адресу ничего нет</Typography.Title>
    <Space wrap>
      <Link to="/login">
        <Button type="primary">Войти</Button>
      </Link>
      <Link to="/">
        <Button>На главную</Button>
      </Link>
      <Button onClick={() => navigate(-1)}>Назад</Button>
    </Space>
  </Layout>
}
