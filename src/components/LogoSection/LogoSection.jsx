import React from "react";
import classNames from "classnames";

import styles from "./styles.module.scss";

import Logo from "../Logo/Logo";

const descriptionClassNames = classNames(styles.description, "h4");

const LogoSection = ({title, description, logoStyle, children}) => {
  const logoClassNames = classNames(styles.logo, {
    [styles.logo_gray]: logoStyle === "gray",
  });

  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <Logo className={logoClassNames} />

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
