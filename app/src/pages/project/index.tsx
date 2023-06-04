import shortid from "shortid";
import Project from "./components/Project";
import AppRoutesProps from "../../types/AppRoutesProps";

const ProjectRoute: AppRoutesProps = {
  path: "/project/:projectID",
  componentRouteProps: {
    type: "Private",
    Component: Project,
    pageTitle: "Project",
    testID: shortid.generate(),
  },
  name: "ProjectRoute",
};

export default ProjectRoute;
