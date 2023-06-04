import React from "react";
import FieldsProps from "../../../types/FieldsProps";

type CardFormProps = {
  title?: string;
  initialValues: object;
  onSubmit: any;
  buttonTiles: string;
  fields: FieldsProps;
  Footer?: React.ElementType;
};
export default CardFormProps;
