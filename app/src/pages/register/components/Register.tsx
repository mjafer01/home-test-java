import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { CardForm } from "../../../components/card-form";
import { CentralBox } from "../../../components/centeral-box";
import { Spinner } from "../../../components/spinner";
import RegisterProps from "../types/RegisterProps";
import Fields from "../utils/Fields";
import { RegisterAccount as RegisterAccountAPI } from "../../../api-services/rest-api";
import Sleep from "../../../utils/Sleep";
import FieldsProps from "../../../types/FieldsProps";

const Register: React.FC<RegisterProps> = ({ urlProps, testID }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [loginNavigate, setLoginNavigate] = React.useState(false);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (loginNavigate) {
      navigate("/login");
    }
  }, [loginNavigate]);

  const Footer = () => {
    return (
      <Box sx={{ float: "right" }}>
        <Link
          sx={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/login");
          }}
        >
          Have a account login
        </Link>
      </Box>
    );
  };
  const onSubmit = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    setIsLoading(true);
    toast.dismiss();
    toast.info("Registering...", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });
    const response = await RegisterAccountAPI(
      data.firstName,
      data.lastName,
      data.email,
      data.password
    );
    toast.dismiss();
    if (response.isException && response.exception.message.includes("Email")) {
      toast.error(response.exception.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });

      setIsLoading(false);

      return;
    }
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
      return;
    }
    toast.success(
      "You account has been register. Please login to continue...",
      {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
      }
    );
    await Sleep(2000);
    setLoginNavigate(true);
  };

  return (
    <CentralBox>
      <Spinner doOpenSpinner={isLoading} />
      <CardForm
        initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
        onSubmit={onSubmit}
        buttonTiles={"Register"}
        fields={Fields as FieldsProps}
        title={"New Account"}
        Footer={Footer}
      />
    </CentralBox>
  );
};
export default Register;
