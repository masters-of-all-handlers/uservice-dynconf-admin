import React from "react";

import styles from "./styles.module.scss";

import Logo from "../../components/Logo/Logo";

const LogoCard = ({title, children}) => {
  return (
    <div className={styles.card}>
      <Logo className={styles.logo} />

      <h2 className={styles.title}>{title}</h2>

      {children}
    </div>
  );
};

export default LogoCard;
