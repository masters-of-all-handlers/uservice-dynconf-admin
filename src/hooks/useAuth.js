import {
  useCallback,
  useContext,
  useState,
  createContext,
  useEffect
} from "react";
import {authAPI} from "../services/AuthService";
import {Spin} from "antd";
import {getStoredTicket} from "../utils/auth";

const AuthContext = createContext({
  data: {ticket: getStoredTicket()}, login(_) {
  }, logout() {
  }
});


export const AuthProvider = ({children}) => {
  const [authData, setAuthData] = useState({ticket: null});
  const login = useCallback((authData) => {
    setAuthData({ticket: null, ...authData});
    window.localStorage.setItem("uda_ticket", authData.ticket);
  });
  const logout = useCallback(() => {
    setAuthData({ticket: null});
    window.localStorage.removeItem("uda_ticket");
  });
  const {
    data: checkData,
    error: checkError,
    isLoading: isCheckLoading
  } = authAPI.useCheckQuery();
  useEffect(() => {
    const savedTicket = window.localStorage.getItem("uda_ticket");
    if (checkError) {
      logout();
    } else {
      setAuthData({ticket: savedTicket});
    }
  }, []);
  return isCheckLoading ?
    <Spin style={{margin: "50vh auto 0", display: "block"}}/> :
    <AuthContext.Provider value={{
      data: authData,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>;
}

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
