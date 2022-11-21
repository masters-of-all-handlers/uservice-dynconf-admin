import React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Menu} from "antd";

import styles from "./styles.module.scss";
import {menuItems} from "./menuItems";
import {DASHBOARD_CONFIGS_URL, DASHBOARD_USERS_URL} from "../../constants";
import useAuth from "../../hooks/useAuth";

const MainMenu = () => {
  const location = useLocation();
  const current = menuItems.filter(item => {
    return location.pathname.startsWith(item.prefix);
  })[0];

  const currentKey = current?.key;

  const navigate = useNavigate();
  const {logout} = useAuth();

  const onMenuClick = (e) => {
    const {key} = e;
    switch (key) {
      case "configs":
        navigate(DASHBOARD_CONFIGS_URL);
        break;
      case "users":
        navigate(DASHBOARD_USERS_URL);
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
    />
  );
};

export default MainMenu;
