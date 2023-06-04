import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

const Fields = [
  {
    type: "radio",
    rules: {
      required: { value: true, message: "Bid type is required" },
    },
    name: "bidPriceTypeID",
    placeholder: "Bid type",
    children: (
      <>
        <FormControlLabel value="1" control={<Radio />} label="Fixed" />
        <FormControlLabel value="2" control={<Radio />} label="Hourly" />
      </>
    ),
  },
  {
    type: "text",
    rules: {
      required: { value: true, message: "Bid price is required" },
    },
    name: "price",
    placeholder: "Bid Price",
  },
];
export default Fields;
