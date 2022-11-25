import React from "react";
import {useNavigate} from "react-router-dom";
import {Button, Space} from "antd";

import styles from "./styles.module.scss";

import MainLayout from "../MainLayout/MainLayout";

import {LOGIN_URL} from "../../constants";
import useAuth from "../../hooks/useAuth";
import LogoSection from "../../components/LogoSection/LogoSection";

export default function NotFoundPage() {
  const navigate = useNavigate();

  const {
    data: {ticket},
  } = useAuth();

  const isNotAuth = Boolean(ticket) === false;
  const rootType = isNotAuth ? "default" : "primary";

  const handleBackClick = () => navigate(-1);
  const handleRootClick = () => navigate("/");
  const handleLoginClick = () => navigate(LOGIN_URL);

  return (
    <MainLayout type="branded">
      <LogoSection
        title="404"
        description="Похоже вы заблудились :("
        logoStyle="gray"
      >
        <Space className={styles.buttons}>
          <Button onClick={handleBackClick}>Назад</Button>

          <Button onClick={handleRootClick} type={rootType}>
            На главную
          </Button>

          {isNotAuth && (
            <Button onClick={handleLoginClick} type="primary">
              Вход
            </Button>
          )}
        </Space>
      </LogoSection>
    </MainLayout>
  );
}
