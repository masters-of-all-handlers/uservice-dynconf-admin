import React, {useState} from "react";
import {Input} from "antd";

import styles from "./styles.module.scss";

const {Search} = Input;

const TableTitleSearch = ({title, onSearch, value, isFetching}) => {
  return (
    <div className={styles.wrap}>
      <span>{title}</span>

      <Search
        placeholder="Поиск..."
        allowClear
        defaultValue={value}
        onSearch={onSearch}
        loading={isFetching}
      />
    </div>
  );
};

export default TableTitleSearch;
