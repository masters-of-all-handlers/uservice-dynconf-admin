import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {Button, Space} from "antd";

import styles from "./styles.module.scss";

import MainLayout from "../MainLayout/MainLayout";

import LogoSection from "../../components/LogoSection/LogoSection";

export default function NotFoundPage() {
  const navigate = useNavigate();

  const handleBackClick = () => navigate(-1);

  return (
    <MainLayout type="branded">
      <LogoSection
        title="404"
        description="Похоже вы заблудились :("
        logoType="gray"
      >
        <Space className={styles.buttons}>
          <Button onClick={handleBackClick}>Назад</Button>

          <Link to="/">
            <Button type="primary">На главную</Button>
          </Link>
        </Space>
      </LogoSection>
    </MainLayout>
  );
}
