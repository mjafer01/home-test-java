import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ProjectGrid } from "../../../components/project-grid";
import { Spinner } from "../../../components/spinner";
import ProjectsProps from "../types/ProjectsProps";
import { AllActiveProjects as AllActiveProjectsAPI } from "../../../api-services/rest-api";
const ProjectTable: React.FC<ProjectsProps> = ({ urlProps, testID }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const rowData = React.useRef<any>([]);
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 10,
    page: 0,
  });
  const navigate = useNavigate();
  console.log(urlProps);

  React.useEffect(() => {
    if (!urlProps.session) {
      return;
    }
    loadData();
  }, [paginationModel, urlProps.session]);

  const loadData = async () => {
    setIsLoading(true);
    toast.info("Loading data...", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });
    const response = await AllActiveProjectsAPI(
      paginationModel.page,
      paginationModel.pageSize,
      urlProps.session
    );
    if (response.isException) {
      toast.warning(
        "Some thing has gone horribly wrong. Please contact us if it persists",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
        }
      );

      setIsLoading(false);
    }
    rowData.current = response.response;
    toast.dismiss();
    setIsLoading(false);
  };

  return (
    <>
      <Spinner doOpenSpinner={isLoading} />

      <ProjectGrid
        rowData={rowData.current}
        onRowClick={(row: any) => {
          navigate("/project/" + row.id);
        }}
        height={520}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
      />
    </>
  );
};
export default Projects;
