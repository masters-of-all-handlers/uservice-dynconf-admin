import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import {AUTH_DISABLED} from "../../constants";
import {Outlet} from "react-router-dom";


export default function AuthRequired() {
  if (!AUTH_DISABLED && window.localStorage.getItem("uda_ticket") !== "ok") {
    return <NotFoundPage/>;
  }
  return <Outlet/>;
}
