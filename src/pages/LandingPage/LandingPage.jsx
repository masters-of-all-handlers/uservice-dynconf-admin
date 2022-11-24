import React from "react";
import {Button} from "antd";
import {Navigate, useNavigate} from "react-router-dom";

import styles from "./styles.module.scss";

import MainLayout from "../MainLayout/MainLayout";

import {DASHBOARD_CONFIGS_URL, LOGIN_URL, SITE_NAME} from "../../constants";
import useAuth from "../../hooks/useAuth";
import LogoCard from "../../components/LogoCard/LogoCard";

export default function LandingPage() {
  const navigate = useNavigate();
  const auth = useAuth();

  if (auth.data.ticket) {
    return <Navigate to={DASHBOARD_CONFIGS_URL} />;
  }

  const handleLogInClick = () => navigate(LOGIN_URL);

  return (
    <MainLayout type="branded">
      <section className={styles.hero}>
        <LogoCard title={SITE_NAME}>
          <Button type="primary" block onClick={handleLogInClick} size="large">
            Войти
          </Button>
        </LogoCard>
      </section>
    </MainLayout>
  );
}
