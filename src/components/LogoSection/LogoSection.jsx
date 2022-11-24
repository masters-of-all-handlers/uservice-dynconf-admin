import React from "react";

import styles from "./styles.module.scss";

import Logo from "../Logo/Logo";

const LogoSection = ({title, children}) => {
  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <Logo className={styles.logo} />

        <h2 className={styles.title}>{title}</h2>

        {children}
      </div>
    </section>
  );
};

export default LogoSection;
