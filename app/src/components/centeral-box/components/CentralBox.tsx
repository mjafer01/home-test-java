import React from "react";
import Box from "@mui/material/Box";
import CentralBoxProps from "../types/CentralBoxProps";

const CentralBox: React.FC<CentralBoxProps> = ({ children }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      {children}
    </Box>
  );
};
export default CentralBox;
