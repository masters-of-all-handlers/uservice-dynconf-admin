import React from 'react';
import 'antd/dist/antd.css';
import {ConfigProvider} from 'antd';
import ruRU from 'antd/es/locale/ru_RU';

import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { store } from './store';
import HomePage from './pages/HomePage/HomePage';
//import EditPage from "./pages/EditPage/EditPage";

const App = () => {

  return (
    <Provider store={store}>
      <ConfigProvider locale={ruRU}>
        <BrowserRouter>
          <Routes>
            <Route index element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </Provider>
  );
};

export default App;
