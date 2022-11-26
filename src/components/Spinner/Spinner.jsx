import React from "react";
import {Spin} from "antd";

import styles from "./styles.module.scss";

const Spinner = () => {
  return <Spin className={styles.spinner} />;
};

export default Spinner;
