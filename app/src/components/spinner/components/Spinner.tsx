import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import SpinnerProps from "../types/SpinnerProps";
const Spinner: React.FC<SpinnerProps> = ({ doOpenSpinner }) => {
  return (
    <>
      <Backdrop sx={{ color: "#fff", zIndex: 111 }} open={doOpenSpinner}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};
export default Spinner;
