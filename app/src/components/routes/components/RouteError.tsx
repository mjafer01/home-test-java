import React from "react";
import { RouteErrorProps } from "../types";

const RouteError: React.FC<RouteErrorProps> = ({
  componentProps,
  Component,
  testID,
  urlProps,
  errorType,
}) => {
  return <>{errorType}</>;
};
export default RouteError;
