import React from "react";
import {Input} from "antd";

import styles from "./styles.module.scss";

const {Search} = Input;

const TableTitleSearch = ({title, onSearch}) => {
  return (
    <div className={styles.wrap}>
      <span>{title}</span>

      <Search placeholder="Поиск..." allowClear onSearch={onSearch} />
    </div>
  );
};

export default TableTitleSearch;
