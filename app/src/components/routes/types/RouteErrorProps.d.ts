import * as React from "react";
type RouteErrorProps = {
  urlProps?: any;
  componentProps?: { layout?: object; component?: object };
  Component: React.ElementType;
  testID?: string;
  errorType: "404" | "error";
};

export default RouteErrorProps;
