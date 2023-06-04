import shortid from "shortid";
import Register from "./components/Register";
import AppRoutesProps from "../../types/AppRoutesProps";

const RegisterRoute: AppRoutesProps = {
  path: "/register",
  componentRouteProps: {
    type: "Protected",
    Component: Register,
    pageTitle: "Register",
    testID: shortid.generate(),
  },
  name: "RegisterRoute",
};

export default RegisterRoute;
