import React from "react";
import {Button} from "antd";
import {Navigate, useNavigate} from "react-router-dom";

import MainLayout from "../MainLayout/MainLayout";

import {DASHBOARD_CONFIGS_URL, LOGIN_URL, SITE_NAME} from "../../constants";
import useAuth from "../../hooks/useAuth";
import LogoSection from "../../components/LogoSection/LogoSection";

export default function LandingPage() {
  const navigate = useNavigate();
  const auth = useAuth();

  if (auth.data.ticket) {
    return <Navigate to={DASHBOARD_CONFIGS_URL} />;
  }

  const handleLogInClick = () => navigate(LOGIN_URL);

  return (
    <MainLayout type="branded">
      <LogoSection title={SITE_NAME}>
        <Button type="primary" block onClick={handleLogInClick} size="large">
          Войти
        </Button>
      </LogoSection>
    </MainLayout>
  );
}
