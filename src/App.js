import React from "react";
import "antd/dist/antd.compact.less";
import {ConfigProvider} from "antd";
import ruRU from "antd/es/locale/ru_RU";

import {Provider} from "react-redux";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import {store} from "./store";
import HomePage from "./pages/HomePage/HomePage";
import EditPage from "./pages/EditPage/EditPage";
import CreatePage from "./pages/CreatePage/CreatePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ClonePage from "./pages/ClonePage/ClonePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import UserCreatePage from "./pages/UserCreatePage/UserCreatePage";
import {DASHBOARD_URL} from "./constants";
import AuthRequired from "./components/AuthRequired/AuthRequired";
import {AuthProvider} from "./hooks/useAuth";

const App = () => {
  return (
    <Provider store={store}>
      <ConfigProvider locale={ruRU}>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route index path="/" element={<LandingPage/>}/>

              <Route path="/login" element={<LoginPage/>}/>

              <Route path={DASHBOARD_URL} element={<AuthRequired/>}>
                <Route path="configs">
                  <Route path="create" element={<CreatePage/>}/>
                  <Route path=":uuid/clone" element={<ClonePage/>}/>
                  <Route path=":uuid/edit" element={<EditPage/>}/>
                  <Route index element={<HomePage/>}/>
                </Route>

                <Route path="users">
                  <Route path="create" element={<UserCreatePage/>}/>
                </Route>
              </Route>

              <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ConfigProvider>
    </Provider>
  );
};

export default App;
