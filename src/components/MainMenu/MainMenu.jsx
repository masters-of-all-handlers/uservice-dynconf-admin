import React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Menu} from "antd";
import {MenuOutlined} from "@ant-design/icons";

import styles from "./styles.module.scss";
import {menuItemsAuth} from "./menuItemsAuth";
import {menuItemsNotAuth} from "./menuItemsNotAuth";

import {
  DASHBOARD_CONFIGS_URL,
  DASHBOARD_USERS_URL,
  LOGIN_URL,
} from "../../constants";
import useAuth from "../../hooks/useAuth";

const MainMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    data: {ticket},
    logout,
  } = useAuth();

  const menuItems = Boolean(ticket) ? menuItemsAuth : menuItemsNotAuth;

  const current = menuItems.filter((item) => {
    return location.pathname.startsWith(item.prefix);
  })[0];

  const currentKey = current?.key;

  const onMenuClick = (e) => {
    const {key} = e;

    switch (key) {
      case "configs":
        navigate(DASHBOARD_CONFIGS_URL);
        break;

      case "users":
        navigate(DASHBOARD_USERS_URL);
        break;

      case "login":
        navigate(LOGIN_URL);
        break;

      case "logout":
        logout();
        navigate("/");
        break;

      default:
        break;
    }
  };

  return (
    <Menu
      className={styles.menu}
      theme="dark"
      mode="horizontal"
      selectedKeys={[currentKey]}
      onClick={onMenuClick}
      items={menuItems}
      overflowedIndicator={<MenuOutlined />}
    />
  );
};

export default MainMenu;
