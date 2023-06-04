import * as React from "react";
type RoutePrivateProps = {
  componentProps?: { layout?: object; component?: object };
  Component: React.ElementType;
  testID?: string;
  urlProps?: any;
};

export default RoutePrivateProps;
