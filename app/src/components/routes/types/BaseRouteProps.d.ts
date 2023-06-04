import * as React from "react";
type BaseRouteProps = {
  componentProps?: { layout?: object; component?: object };
  errorType?: "404" | "error";
  pageTitle?: string;
  Component: React.ElementType;
  type: "Public" | "Protected" | "Private" | "Error";
  testID?: string;
};

export default BaseRouteProps;
