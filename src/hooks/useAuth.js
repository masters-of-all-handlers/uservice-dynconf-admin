import {
  useCallback,
  useContext,
  useState,
  createContext,
  useEffect
} from "react";
import {authAPI} from "../services/AuthService";
import {getStoredTicket} from "../utils/auth";
import Spinner from "../components/Spinner/Spinner";

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
  }, []);
  const logout = useCallback(() => {
    setAuthData({ticket: null});
    window.localStorage.removeItem("uda_ticket");
  }, []);
  const {
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
  }, [checkError, logout]);
  return isCheckLoading ?
    <Spinner /> :
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
