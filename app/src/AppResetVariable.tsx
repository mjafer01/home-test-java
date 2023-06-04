import React from "react";
import { useNavigate } from "react-router-dom";
import {
  SetAuthToken,
  SetUnAuthorizedRequestProcess,
} from "./api-services/rest-api";
import { GlobalContext } from "./logic-cf";
import { LoginRoute } from "./pages";

const AppResetVariable: React.FC = () => {
  const { getUserSession, clearStorage } = React.useContext(GlobalContext);
  const navigate = useNavigate();
  const userSession = getUserSession();
  if (userSession.isLogged) {
    SetAuthToken(userSession.response["accessToken"]);
  }
  const UnAuthorizeProcessFunc = () => {
    clearStorage();
    navigate(LoginRoute.path);
  };
  SetUnAuthorizedRequestProcess(UnAuthorizeProcessFunc);
  return <></>;
};
export default AppResetVariable;
