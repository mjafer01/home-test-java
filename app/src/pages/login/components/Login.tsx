import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { Spinner } from "../../../components/spinner";
import { CardForm } from "../../../components/card-form";
import { CentralBox } from "../../../components/centeral-box";
import LoginProps from "../types/LoginProps";
import Fields from "../utils/Fields";
import { Login as LoginAPI } from "../../../api-services/rest-api";
import { UserContext } from "../../../contexts/userContext";
import FieldsProps from "../../../types/FieldsProps";

const Login: React.FC<LoginProps> = ({ urlProps, testID }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [loginNavigate, setLoginNavigate] = React.useState(false);
  const { setUserSession } = React.useContext(UserContext);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (loginNavigate) {
      navigate("/");
    }
  }, [loginNavigate]);
  const Footer = () => {
    return (
      <Box sx={{ float: "right" }}>
        <Link
          sx={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/register");
          }}
        >
          Register New Account
        </Link>
      </Box>
    );
  };
  const onSubmit = async (data: { email: string; password: string }) => {
    setIsLoading(true);
    toast.dismiss();
    toast.info("Logging In...", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });
    const response = await LoginAPI(data.email, data.password);
    toast.dismiss();
    if (response.isException) {
      if (response.status === 401) {
        toast.error("Email and/or password does not exist", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
      } else {
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
      }
      setIsLoading(false);
      return;
    }
    setUserSession(response.response);
    toast.success("Successfully logged in", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });

    setLoginNavigate(true);
  };

  return (
    <CentralBox>
      <Spinner doOpenSpinner={isLoading} />
      <CardForm
        initialValues={{ email: "", password: "" }}
        onSubmit={onSubmit}
        buttonTiles={"Login"}
        fields={Fields as FieldsProps}
        title={"Login"}
        Footer={Footer}
      />
    </CentralBox>
  );
};
export default Login;
