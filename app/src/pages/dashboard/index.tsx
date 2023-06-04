import shortid from "shortid";
import Dashboard from "./components/Dashboard";
import AppRoutesProps from "../../types/AppRoutesProps";

const DashboardRoute: AppRoutesProps = {
  path: "/dashboard",
  componentRouteProps: {
    type: "Private",
    Component: Dashboard,
    pageTitle: "Dashboard",
    testID: shortid.generate(),
  },
  name: "DashboardRoute",
};

export default DashboardRoute;
