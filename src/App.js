import React from 'react';
import 'antd/dist/antd.css';
import {ConfigProvider} from 'antd';
import ruRU from 'antd/es/locale/ru_RU';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import EditPage from "./pages/EditPage/EditPage";

const App = () => {
    return (
        <ConfigProvider locale={ruRU}>
            <BrowserRouter>
                <Routes>
                    <Route index element={<HomePage/>}/>
                    <Route path="/edit/:id" element={<EditPage/>}/>
                </Routes>
            </BrowserRouter>
        </ConfigProvider>
    );
};

export default App;
