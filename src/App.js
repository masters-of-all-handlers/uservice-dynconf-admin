import React from 'react';
import 'antd/dist/antd.min.css';
import {ConfigProvider} from 'antd';
import ruRU from 'antd/es/locale/ru_RU';

import {Provider} from 'react-redux';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import {store} from './store';
import HomePage from './pages/HomePage/HomePage';
import EditPage from "./pages/EditPage/EditPage";
import CreatePage from "./pages/CreatePage/CreatePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ClonePage from "./pages/ClonePage/ClonePage";

const App = () => {
  return (
    <Provider store={store}>
      <ConfigProvider locale={ruRU}>
        <BrowserRouter>
          <Routes>
            <Route index element={<HomePage/>}/>
            <Route path="/edit/:id" element={<EditPage/>}/>
            <Route path="/create" element={<CreatePage/>}/>
            <Route path="/clone/:id" element={<ClonePage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </Provider>
  );
};

export default App;
