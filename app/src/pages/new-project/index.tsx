import shortid from "shortid";
import NewProject from "./components/NewProject";
import AppRoutesProps from "../../types/AppRoutesProps";

const NewProjectsRoute: AppRoutesProps = {
  path: "/new-project",
  componentRouteProps: {
    type: "Private",
    Component: NewProject,
    pageTitle: "New Project",
    testID: shortid.generate(),
  },
  name: "NewProjectsRoute",
};

export default NewProjectsRoute;
