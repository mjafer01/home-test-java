import * as React from "react";
import { jsx } from "@emotion/react";
import JSX = jsx.JSX;
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

type FieldsProps =
  | {
      type: "text";
      rules: object;
      name: string;
      placeholder: string;
    }[]
  | {
      type: "password";
      rules: object;
      name: string;
      placeholder: string;
    }[]
  | {
      type: "radio";
      rules: object;
      name: string;
      placeholder: string;
      children: ReactJSXElement;
    }[];

export default FieldsProps;
