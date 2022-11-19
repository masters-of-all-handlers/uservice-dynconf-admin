import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Menu} from "antd";

import styles from "./styles.module.scss";
import {menuItems} from "./menuItems";

const MainMenu = () => {
  const [current, setCurrent] = useState("configs");

  const navigate = useNavigate();

  const onMenuClick = (e) => {
    const {key} = e;

    setCurrent(key);

    switch (key) {
      case "configs":
        navigate(`/configs`);
        break;

      default:
    }
  };

  return (
    <Menu
      className={styles.menu}
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={current}
      onClick={onMenuClick}
      items={menuItems}
    />
  );
};

export default MainMenu;
