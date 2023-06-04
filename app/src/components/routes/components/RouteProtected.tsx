import React from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../contexts/userContext";
import { RouteProtectedProps } from "../types";
import { useParams } from "*";

const RouteProtected: React.FC<RouteProtectedProps> = ({
  componentProps,
  Component,
  testID,
  urlProps,
}) => {
  const { getUserSession } = React.useContext(UserContext);
  const navigate = useNavigate();
  const props =
    componentProps && componentProps.component ? componentProps.component : {};
  React.useEffect(() => {
    const loadedUser = getUserSession();
    if (loadedUser.isLogin) {
      navigate("/");
    }
  }, []);
  return <Component {...props} testID={testID} urlProps={urlProps} />;
};
export default RouteProtected;
