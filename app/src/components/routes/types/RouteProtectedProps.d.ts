import * as React from "react";
type RouteProtectedProps = {
  urlProps?: any;
  componentProps?: { layout?: object; component?: object };
  Component: React.ElementType;
  testID?: string;
};

export default RouteProtectedProps;
