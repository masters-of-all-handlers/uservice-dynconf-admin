import React from 'react';
import 'antd/dist/antd.css';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/es/locale/ru_RU';

import HomePage from './pages/HomePage/HomePage';

const App = () => {
  return (
    <ConfigProvider locale={ruRU}>
      <HomePage />
    </ConfigProvider>
  );
};

export default App;
