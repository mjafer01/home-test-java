import * as React from "react";
import BaseRouteProps from "../components/routes/types/BaseRouteProps";

type AppRoutesProps = {
  path: string;
  componentRouteProps: BaseRouteProps;
  name: string;
};
export default AppRoutesProps;
