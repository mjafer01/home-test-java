import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { Spinner } from "../../../components/spinner";
import ProjectProps from "../types/ProjectProps";
import { ProjectGrid } from "../../../components/project-grid";
import Fields from "../utils/Fields";
import { Project as ProjectAPI } from "../../../api-services/rest-api";
import SingleProjectProps from "../types/SingleProjectProps";
const SingleProject: React.FC<SingleProjectProps> = ({
  urlProps,
  testID,
  updateProjectID,
  setActiveStatus,
  setWiningBidID,
}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const rowData = React.useRef<any>([]);

  React.useEffect(() => {
    if (!urlProps.session) {
      return;
    }
    loadData();
  }, [urlProps.session, urlProps.projectID]);

  const loadData = async () => {
    setIsLoading(true);
    toast.info("Loading project data. Please wait...", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });
    const response = await ProjectAPI(
      parseInt(urlProps.projectID),
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
    rowData.current = [response.response];
    updateProjectID(response.response.accountID);
    setActiveStatus(response.response.isActive === 1);
    setWiningBidID(response.response.winningBidID);
    toast.dismiss();
    setIsLoading(false);
  };

  return (
    <>
      <Spinner doOpenSpinner={isLoading} />
      <ProjectGrid
        rowData={rowData.current}
        onRowClick={(row: any) => {}}
        height={200}
        paginationModel={{
          pageSize: 10,
          page: 0,
        }}
        setPaginationModel={() => {}}
      />
    </>
  );
};
export default SingleProject;
