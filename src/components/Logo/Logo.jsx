import React from "react";
import classNames from "classnames";

import styles from "./styles.module.scss";

import {ReactComponent as LogoSVG} from "../../logo.svg";

const Logo = ({className}) => {
  const logoClassNames = classNames(styles.logo, className);

  return <LogoSVG className={logoClassNames} />;
};

export default Logo;
