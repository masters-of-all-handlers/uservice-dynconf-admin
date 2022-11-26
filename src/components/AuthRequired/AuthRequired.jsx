import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import {AUTH_DISABLED} from "../../constants";
import {Outlet} from "react-router-dom";
import useAuth from "../../hooks/useAuth";


export default function AuthRequired() {
  const {data} = useAuth();
  if (!AUTH_DISABLED && !data.ticket) {
    return <NotFoundPage/>;
  }
  return <Outlet/>;
}
