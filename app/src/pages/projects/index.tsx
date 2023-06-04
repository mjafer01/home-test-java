import shortid from "shortid";
import Projects from "./components/Projects";
import AppRoutesProps from "../../types/AppRoutesProps";

const ProjectRoute: AppRoutesProps = {
  path: "/projects",
  componentRouteProps: {
    type: "Private",
    Component: Projects,
    pageTitle: "Projects",
    testID: shortid.generate(),
  },
  name: "ProjectRoute",
};

export default ProjectRoute;
