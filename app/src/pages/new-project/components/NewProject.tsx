import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProjectsProps from "../types/NewProjectProps";
import { CardForm } from "../../../components/card-form";
import { CentralBox } from "../../../components/centeral-box";
import { Spinner } from "../../../components/spinner";
import Fields from "../utils/Fields";
import { NewProject as NewProjectAPI } from "../../../api-services/rest-api";
import FieldsProps from "../../../types/FieldsProps";

const NewProject: React.FC<ProjectsProps> = ({ urlProps, testID }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [navigateNow, setNavigateNow] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (navigateNow) {
      navigate("/projects");
    }
  }, [navigateNow]);
  const onSubmit = async (data: {
    projectName: string;
    projectDescription: string;
    projectHours: string;
    projectEnd: string;
  }) => {
    setIsLoading(true);
    toast.dismiss();
    toast.info("Loading...", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });
    const response = await NewProjectAPI(
      data.projectName,
      data.projectDescription,
      data.projectHours,
      data.projectEnd,
      urlProps.session
    );

    toast.dismiss();
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
      return;
    }
    toast.success("New Project Added Successful", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });
    setNavigateNow(true);
  };

  return (
    <CentralBox>
      <Spinner doOpenSpinner={isLoading} />
      <CardForm
        initialValues={{
          projectName: "",
          projectDescription: "",
          projectHours: "",
          projectEnd: "",
        }}
        onSubmit={onSubmit}
        buttonTiles={"Submit"}
        fields={Fields as FieldsProps}
        title={"New Project"}
      />
    </CentralBox>
  );
};
export default NewProject;
