import React from 'react';
import 'antd/dist/antd.css';
import {ConfigProvider} from 'antd';
import ruRU from 'antd/es/locale/ru_RU';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import EditPage from "./pages/EditPage/EditPage";
import CreatePage from "./pages/CreatePage/CreatePage";
import {Provider} from "react-redux";
import {store} from "./store";

const App = () => {
    return (
        <Provider store={store}>
            <ConfigProvider locale={ruRU}>
                <BrowserRouter>
                    <Routes>
                        <Route index element={<HomePage/>}/>
                        <Route path="/edit/:id" element={<EditPage/>}/>
                        <Route path="/create" element={<CreatePage/>}/>
                    </Routes>
                </BrowserRouter>
            </ConfigProvider>
        </Provider>
    );
};

export default App;
