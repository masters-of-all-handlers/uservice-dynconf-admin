import React from "react";
import classNames from "classnames";

import styles from "./styles.module.scss";

import Logo from "../Logo/Logo";

const descriptionClassNames = classNames(styles.description, "h4");

const LogoSection = ({title, description, children}) => {
  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <Logo className={styles.logo} />

        {Boolean(title) && <h1 className={styles.title}>{title}</h1>}

        {Boolean(description) && (
          <p className={descriptionClassNames}>{description}</p>
        )}

        {children}
      </div>
    </section>
  );
};

export default LogoSection;
