import shortid from "shortid";
import Login from "./components/Login";
import AppRoutesProps from "../../types/AppRoutesProps";

const LoginRoute: AppRoutesProps = {
  path: "/login",
  componentRouteProps: {
    type: "Protected",
    Component: Login,
    pageTitle: "Login",
    testID: shortid.generate(),
  },
  name: "LoginRoute",
};

export default LoginRoute;
